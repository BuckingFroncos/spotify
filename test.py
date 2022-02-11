# MUST DO BEFORE RUNNING ###################################
############################################################
## 1. Install libraries
#
# pip install testresources
# pip install spotipy
#
## 2. Set up environment variables
#
# * SPOTIPY_CLIENT_ID = <INSERT_YOUR_CLIENT_ID_STRING>
# * SPOTIPY_CLIENT_SECRET = <INSERT_YOUR_CLIENT_SECRET_STRING>
#
# >> note I had modified -->   ~/.bash_profile
#    and ran             -->   source ~/.bash_profile

# Imports ##################################################
############################################################
import os

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


# Functions ################################################
############################################################

# authenticates using client_id and client_secret
# accesses top 50 global playlist
# prints out top 5 song info
def test_global5():
  cid = os.environ['SPOTIPY_CLIENT_ID']
  secret = os.environ['SPOTIPY_CLIENT_SECRET']
  
  # Authentication
  client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
  
  sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)
  
  # global top 50 global link http url
  playlist_link = "https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF?si=1333723a6eff4b7f"
  
  playlist_URI = playlist_link.split("/")[-1].split("?")[0]
  track_uris = [x["track"]["uri"] for x in sp.playlist_tracks(playlist_URI)["items"]]
  
  count = 1
  for track in sp.playlist_tracks(playlist_URI)["items"]:
    # song list
    slist = []
    
    # URI
    track_uri = track["track"]["uri"]
    audio_features = sp.audio_features(track_uri)[0]
    slist.append(track_uri)
    slist.append(audio_features)
    
    # Track name
    track_name = track["track"]["name"]
    slist.append(track_name)
    
    # Main Artist
    artist_uri = track["track"]["artists"][0]["uri"]
    artist_info = sp.artist(artist_uri)
    slist.append(artist_uri)
    slist.append(artist_info)
    
    # Name, popularity, genre
    artist_name = track["track"]["artists"][0]["name"]
    artist_pop = artist_info["popularity"]
    artist_genres = artist_info["genres"]
    slist.append(artist_name)
    slist.append(artist_pop)
    slist.append(artist_genres)
    
    # Album
    album = track["track"]["album"]["name"]
    slist.append(album)
    
    # Popularity of the track
    track_pop = track["track"]["popularity"]
    slist.append(track_pop)

    # Printing
    print("Track #" + str(count))
    count += 1
    for x in slist:
      print(x)
    
    print("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
    if count > 5:
     break

# Main #####################################################
############################################################
if __name__ == "__main__":
  test_global5()


# EOF ######################################################
