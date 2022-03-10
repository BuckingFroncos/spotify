import unittest
from spotify_functions import *

# use flag -v for verbosity

class TestSpotify(unittest.TestCase):

    # search for blackpink
    def test_search(self):
        message = "Could not search for Blackpink"
        self.assertIsNotNone(search_for_artist("Blackpink"), message)

    # search for edm artists
    def test_genre(self):
        message = "Could not search for edm artists"
        self.assertIsNotNone(search_by_genre("edm"), message)

    # search for artists by year
    def test_year(self):
        message = "Could not search for artists"
        self.assertIsNotNone(search_by_year("2022"), message)

    # search for related artists by blackpink uri
    def test_related(self):
        message = "Could not search for related artists"
        self.assertIsNotNone(search_for_related_artists("spotify:artist:4q3ewBCX7sLwd24euuV69X"), message)

    # search for blackpink with genre pop
    def test_multiple(self):
        message = "Could not search for Blackpink (pop)"
        self.assertIsNotNone(search_artist(artist='Blackpink', genre='pop'), message)

    # search for top 5 tracks from KID LAROI
    def test_tracks(self):
        message = "Could not search for top 5 tracks from KID LAROI"
        self.assertIsNotNone(get_songs("spotify:artist:2tIP7SsRs7vjIcLrU85W8J"))

    # creates a playlist named test
    def test_create(self):
        message = "Could not create collaborative playlist 'test'"
        self.assertIsNotNone(create_playlist('test'))
        

if __name__ == "__main__":
    unittest.main()