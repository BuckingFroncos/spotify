# Imports ##################################################
############################################################

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util
from secretCredentials import *
import os # removing cache files

# DEBUG ####################################################
############################################################
DEBUG_print = True

# Functions ################################################
############################################################

# print top 5, from global top 50
def test_print_top5(debug = DEBUG_print):
    # credentials
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
        slist.append("Artist uri: " + artist_uri)

        # URI
        track_uri = track["track"]["uri"]
        audio_features = sp.audio_features(track_uri)[0]
        slist.append("Track uri: " + track_uri)
        slist.append("Audio features: ")
        for x in audio_features:
            slist.append("  " + x + ": " + str(audio_features[x]))

        # Track name
        track_name = track["track"]["name"]
        slist.append("Track name: " + track_name)

        # Name, popularity, genre
        artist_name = track["track"]["artists"][0]["name"]
        artist_pop = artist_info["popularity"]
        artist_genres = artist_info["genres"]
        slist.append("Artist name: " + artist_name)
        slist.append("Artist pop: " + str(artist_pop))
        slist.append("Artist genres: ")
        for x in artist_genres:
            slist.append("  " + x)

        # Album
        album = track["track"]["album"]["name"]
        slist.append("Album: " + album)

        # Popularity of the track
        track_pop = track["track"]["popularity"]
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

# search for an artist, return dict with artist name, uri, and image
def search_for_artist(artist: str):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # search for artist
    search_results = sp.search(q="artist:" + artist, type="artist")

    # creating artist dictionary
    adict = {}

    # iterate through all search results
    for x in search_results:
        for artist in (search_results[x]["items"]):
            name = (artist["name"])
            uri = (artist["uri"])
            image = (artist["images"])

            if uri not in adict:
                adict[uri] = [name, image]
            #if name not in adict:
            #    adict[name] = [uri, image]
    
    return adict

# search for related artists given artist uri, return dict with artist name, uri, and image
def search_for_related_artists(artist_uri: str):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # display related artists to searched artist
    similar_artist = sp.artist_related_artists(artist_uri)

    # creating artist dict
    adict = {}

    # iterate through all search results
    for artist in similar_artist["artists"]:
        name = (artist["name"])
        uri = (artist["uri"])
        image = (artist["images"])

        if uri not in adict:
            adict[uri] = [name, image]
        #if name not in adict:
        #    adict[name] = [uri, image]

    return adict



# search for artists by genre, return dict with artist name, uri, and image
def search_by_genre(genre: str):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # search by genre
    search_results = sp.search(q="genre:" + genre, type="artist")

    # creating artist dict
    adict = {}

    # iterate through all search results
    for x in search_results:
        for artist in (search_results[x]["items"]):
            name = (artist["name"])
            uri = (artist["uri"])
            image = (artist["images"])

            if uri not in adict:
                adict[uri] = [name, image]
            #if name not in adict:
            #    adict[name] = [uri, image]
                    
    return adict

# search for artists by year, return dict with artist name, uri, and image
def search_by_year(year: str):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # search by year
    search_results = sp.search(q="year:" + year, type="artist")

    # creating artist dict
    adict = {}

    # iterate through all search results
    for x in search_results:
        for artist in (search_results[x]["items"]):
            name = (artist["name"])
            uri = (artist["uri"])
            image = (artist["images"])

            if uri not in adict:
                adict[uri] = [name, image]
            #if name not in adict:
            #    adict[name] = [uri, image]
                    
    return adict

# returns genre list
def get_genres():
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # gets all genre
    genre_list = sp.recommendation_genre_seeds()

    return genre_list

# search by multiple parameters
def search_artist(artist: str = None, genre: str = None, year: str = None):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    str_builder = ""

    if artist is not None:
        str_builder += "artist:" + artist + " "
    if genre is not None:
        str_builder += "genre:" + genre + " "
    if year is not None:
        str_builder += "year:" + year + " "
    
    # if nothing was passed trhrough
    if str_builder == "":
        return None

    # search by parameters
    search_results = sp.search(q=str_builder, type="artist")

    # creating artist dict
    adict = {}

    # iterate through all search results
    for x in search_results:
        for artist in (search_results[x]["items"]):
            name = (artist["name"])
            uri = (artist["uri"])
            image = (artist["images"])

            if uri not in adict:
                adict[uri] = [name, image]
            #if name not in adict:
            #    adict[name] = [uri, image]
                    
    return adict

# get top 5 songs given artist uri
def get_songs(uri: str):
    # credentials
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # search tracks by artist uri
    search_results = sp.artist_top_tracks(uri)

    # creating track dict
    tdict = {}

    # iterate through top 5 search results
    for track in search_results['tracks'][:5]:
        name = track['name']
        t_uri = track['uri']
        audio = track['preview_url']
        art = track['album']['images'][0]['url']

        if uri not in tdict:
            tdict[t_uri] = [name, audio, art]
        #if name not in tdict:
        #    tdict[name] = [t_uri, audio, art]

    return tdict

# create playlist test, returns id to playlist
def create_playlist(pl_name: str, username: str = 'nekkedgramma'):
    # credentials
    scope = 'playlist-modify-private'
    token = util.prompt_for_user_token(username=username, scope=scope, client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri, show_dialog=True)
    sp = spotipy.Spotify(auth=token)

    # create
    uri = sp.user_playlist_create(user = username, name = pl_name, public = False, collaborative = True)
    
    id = uri['id']
    
    return id

# given playlist id, add to playlist
def add_song(pl_id: str, track_uri: str, username: str = 'nekkedgramma', sp = None):
    # credentials
    if sp is not None:
        try:
            pl_info = sp.playlist(pl_id)
            owner = pl_info['owner']
            id = owner['id']
            # print(id)
            sp.current_user_follow_playlist(pl_id)
        except:
            pass
        pass
    else:
        scope = 'playlist-modify-private'
        token = util.prompt_for_user_token(username=username, scope=scope, client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri, show_dialog=True)
        sp = spotipy.Spotify(auth=token)

    # add track
    sp.user_playlist_add_tracks(user = username, playlist_id=pl_id, tracks=[track_uri])

    return True

# given an artist, add top songs to playlist, returns true upon success
def add_song_via_artist(pl_id: str, artist_uri: str, username: str = 'nekkedgramma', sp = None):
    track_dict = get_songs(artist_uri)
    for track_uri in track_dict:
        success = add_song(pl_id, track_uri, username, sp)
        if not success:
            return False

    return True

# login, returns spotipy object
def login(username: str = 'nekkedgramma'):
    # credentials
    scope = 'playlist-modify-private'
    clear_cache()
    token = util.prompt_for_user_token(username=username, scope=scope, client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri, show_dialog=True)
    sp = spotipy.Spotify(auth=token)
    user = sp.current_user()
    username = user['id']

    return sp, username
    
# clear cache
def clear_cache():
    for fname in os.listdir("."):
        if os.path.isfile(fname) and fname.startswith(".cache"):
            os.remove(fname)

if __name__ == "__main__":
    #test_print_top5()
    login()
