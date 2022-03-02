## The purpose of this file is to use spotify api w/
## a supplementary secrets import file

# Imports ##################################################
############################################################

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from secretCredentials import *

# DEBUG ####################################################
############################################################
DEBUG_print = True
DEBUG_onlyartist = False

# Functions ################################################
############################################################

# printing a playlist
def test2a(debug = DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'

    results = spotify.artist_albums(birdy_uri, album_type='album')
    albums = results['items']
    while results['next']:
        results = spotify.next(results)
        albums.extend(results['items'])
    if debug:
        for album in albums:
            print(album['name'])
    return albums

# print top 5, from global top 50
def test2b(debug = DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # global top 50 global link http url
    playlist_link = "https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF?si=1333723a6eff4b7f"

    playlist_URI = playlist_link.split("/")[-1].split("?")[0]
    track_uris = [x["track"]["uri"] for x in sp.playlist_tracks(playlist_URI)["items"]]

    count = 1
    song_list = []

    for track in sp.playlist_tracks(playlist_URI)["items"]:
        # song list
        slist = []

        # Main Artist
        artist_uri = track["track"]["artists"][0]["uri"]
        artist_info = sp.artist(artist_uri)
        slist.append(artist_info["name"])
        slist.append("<...>")
        if not DEBUG_onlyartist:
            slist.append("Artist uri: " + artist_uri)

        # URI
        track_uri = track["track"]["uri"]
        audio_features = sp.audio_features(track_uri)[0]
        if not DEBUG_onlyartist:
            slist.append("Track uri: " + track_uri)
            slist.append("Audio features: ")
            for x in audio_features:
                slist.append("  " + x + ": " + str(audio_features[x]))

        # Track name
        track_name = track["track"]["name"]
        if not DEBUG_onlyartist:
            slist.append("Track name: " + track_name)

        # Name, popularity, genre
        artist_name = track["track"]["artists"][0]["name"]
        artist_pop = artist_info["popularity"]
        artist_genres = artist_info["genres"]
        if not DEBUG_onlyartist:
            slist.append("Artist name: " + artist_name)
            slist.append("Artist pop: " + str(artist_pop))
            slist.append("Artist genres: ")
            for x in artist_genres:
                slist.append("  " + x)

        # Album
        album = track["track"]["album"]["name"]
        if not DEBUG_onlyartist:
            slist.append("Album: " + album)

        # Popularity of the track
        track_pop = track["track"]["popularity"]
        if not DEBUG_onlyartist:
            slist.append("Track pop: " + str(track_pop))

        # Similar artists
        sa_count = 0
        similar_artist = sp.artist_related_artists(artist_uri)
        slist.append("5 Related artists: ")
        for x in similar_artist["artists"]:
            slist.append("  " + x["name"])
            sa_count += 1
            if sa_count > 5:
                break

        # Printing
        if debug:
            print("Track #" + str(count))
            for x in slist:
                print(x)
            
            print("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
        
        count += 1
        song_list.append(slist)
        if count > 5:
            break

    
    return song_list

# search for related artist given an artist, not ready for front-end testing yet
def test2c(artist: str, debug = DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    redo = 0
    adict = {}
    while redo == 0:
        adict.clear()

        # search for artist
        search_results = sp.search(q="artist:" + artist, type="artist")

        for x in search_results:
            for artist in (search_results[x]["items"]):
                name = (artist["name"])
                uri = (artist["uri"])
                if name not in adict:
                    adict[name] = uri
                    

        alist_counter = 0
        for x in adict:
            print("(" + str(alist_counter) + ")  " + x)
            alist_counter += 1
        
        # check if results are valid
        ui = -2
        while ui == -2 or ui > len(adict):
            try:
                ui = int(input("Which result matches? (-1 if not found):  "))
            except:
                continue
        
        # if valid, exit
        # if not valid, then redo
        if ui != -1:
            redo = 1
        elif ui == -1:
            artist = str(input("What artist do you want to search for?  "))
    
    # obtain artist from search result through dict -> list -> key,value conversion
    temp_list = list(adict)
    key = temp_list[ui]
    artist_uri = adict[key]

    slist = []

    # display related artists to searched artist
    similar_artist = sp.artist_related_artists(artist_uri)
    retrieve_err_count = 0
    while len(similar_artist["artists"]) == 0 and retrieve_err_count < 10:
        similar_artist = sp.artist_related_artists(artist_uri)
        retrieve_err_count += 1

    for x in similar_artist["artists"]:
        slist.append("  " + x["name"])
    
    # Printing
    if DEBUG_print:
        print("Artists similar to " + key + ": ")
        if len(slist) == 0:
            print("  <ERROR no similar artists found>")
        for x in slist:
            print(x)

# search for artists/related artists via genre, not ready for front-end testing yet
def test2d(genre: str, debug=DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    redo = 0
    adict = {}
    genre_list = []
    while redo == 0:
        adict.clear()

        # search by genre
        search_results = sp.search(q="genre:" + genre, type="artist")

        for x in search_results:
            for artist in (search_results[x]["items"]):
                name = (artist["name"])
                uri = (artist["uri"])
                if name not in adict:
                    adict[name] = uri
                    
        if len(adict) == 0:
            print_genre_seeds()
            genre = str(input("What genre do you want to search for?  "))
        else:
            alist_counter = 1
            for x in adict:
                if debug:
                    print(str(alist_counter) + ". " + x)
                genre_list.append(str(alist_counter) + ". " + x)
                alist_counter += 1
            redo = 1

    return genre_list

# search for top tracks via year, not ready for front-end testing yet
def test2e(year: str, debug = DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    redo = 0
    adict = {}
    adict.clear()

    # search by year
    search_results = sp.search(q="year:" + year, type="track")

    if debug:
        print("Top tracks of " + year)

    for x in search_results:
        for artist in (search_results[x]["items"]):
            name = (artist["name"])
            uri = (artist["uri"])
            if name not in adict:
                adict[name] = uri
                

    alist_counter = 0
    year_list = []
    for x in adict:
        if debug:
            print(str(alist_counter) + ". " + x)
            year_list.append(str(alist_counter) + ". " + x)
        alist_counter += 1
    
    return year_list
        

# prints testing menu
def test_print_menu():
  string = """
  ##### TESTING MENU NO CREDENTIALS ####
  ### 1. Test printing a playlist ######
  ### 2. Test printing global 5 ########
  ### 3. Search for related artists ####
  ### 4. Search by genre ###############
  ### 5. Search by year ################
  ### 6. Exit ##########################
  """
  print(string)

# prints genre list
def print_genre_seeds(debug = DEBUG_print):
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    genre_list = sp.recommendation_genre_seeds()
    genre_list_counter = 1
    genre_list = []
    for genre in genre_list['genres']:
        if debug:
            print(str(genre_list_counter) + ". " + str(genre))
        genre_list.append(str(genre_list_counter) + ". " + str(genre))
        genre_list_counter += 1

    return genre_list


# Main #####################################################
############################################################

if __name__ == '__main__':
    test_print_menu()
    i = 0
    while i < 1 or i > 6:
        try:
            i = int(input("Input your selection: "))
        except:
            continue
    if i == 1:
        test2a()
    elif i == 2:
        test2b()
    elif i == 3:
        test2c(str(input("What artist do you want to search for?  ")))
    elif i == 4:
        print_genre_seeds()
        test2d(str(input("What genre do you want to search for?  ")))
    elif i == 5:
        test2e(str(input("What year do you want to search for?  ")))


# EOF ######################################################