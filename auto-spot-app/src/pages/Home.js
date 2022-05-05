import React, { useState, useEffect} from "react"
import { Button, Box, Typography, TextField} from "@mui/material"
import { AlternateEmailRounded } from "@mui/icons-material";


export default function Home() {

  const TOKEN = "https://accounts.spotify.com/api/token"
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code')

  var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
  var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
  var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
  var scopes = 'user-read-private user-read-email playlist-modify-private'

  const AUTHORIZE = "https://accounts.spotify.com/authorize"
  let url = AUTHORIZE;
  url += '?client_id=' + client_id
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri)
  url += "&show_dialog=true"
  url += "&scope=" + scopes



      const getDefaultContent = () => {

        return (
            <>
                {
                    <Typography 
                        align="center"
                        sx={{ marginX: '10vw', marginY: '4vw', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                        Welcome User, Login to Spotify to Get Started By Clicking on the Icon on the Right Corner
                    </Typography>
                }
            </>
        );
      }


    const [playlist, setPlaylist] = useState();
    const [playlistID, setPlaylistID] = useState();

    const createPlaylist = () => {
      if(playlist !== undefined && playlist !== ""){
        const token = window.sessionStorage.getItem('token')
        const userID = window.sessionStorage.getItem('userID')
        console.log(`${token} : ${userID} : ${playlist}`)
        fetch(`Createplaylist/?token=${token}&name=${playlist}&user=${userID}`)
        .then(res => {
          console.log("HERE")
          return res.json()
        }).then(data => {
          console.log(data)
          window.sessionStorage.setItem('playlist-id', data['id'])
          window.sessionStorage.setItem('playlist-name', playlist)
          window.sessionStorage.setItem('collabing', false)
         console.log(`${playlist} Has Been Created`)
         window.location.href = '/create'
        })
      }
      else {
        console.log(playlist)
      }

    } 



    const collabPlaylist = () => {
      if(playlistID !== undefined && playlistID !== ""){
        const pl_id  = playlistID.toString()
        const id = pl_id.split('&')
        const play = id[0]
        const owner = id[1]
        console.log(play)
        console.log(owner)
        const token = window.sessionStorage.getItem('token')
        fetch(`/collab/?token=${owner}&id=${playlistID}`)
        .then(res => {
          if(res.status === 200) return res.text()
          else {
            alert(`There is no playlist with the ID: ${playlistID}`)
          }
        }).then(data => {
          console.log(data)
          window.sessionStorage.setItem('playlist-id', playlistID)
          window.sessionStorage.setItem('playlist-name', data)
          window.sessionStorage.setItem('collabOwnerToken', owner)
          window.sessionStorage.setItem('collabing', true)
          window.location.href = '/create'
        })
      }

    } 




    const getContent = () => {

      return (
              <Box>
                <TextField
                sx={{
                    margin: '2vmin',
                }}
                id="Playlist-Field"
                fullWidth={true}
                variant="outlined"
                required
                label="Enter Playlist Name"
                onChange={(e) => {
                  setPlaylist(e.target.value)
                  console.log(e.target.value)
                }}
                color="secondary">
                </TextField>
                <Button
                  sx={{
                      padding: '0.6vmax 20vmax',
                      marginX: '10vw',
                  }}
                  fullWidth={false}
                  variant="contained"
                  color="secondary"
                  onClick={createPlaylist}
                  type="submit">
                      <Typography
                          variant="h5"
                          sx={{
                              color: '#FFF',
                              fontWeight: 450,
                              margin: '0'
                          }}>
                          Create Playlist
                      </Typography>
                  </Button>   
                        
                <TextField
                sx={{
                    margin: '2vmin',
                }}
                id="PlaylistID-Field"
                fullWidth={true}
                variant="outlined"
                required
                label="Enter Playlist-ID To Start Collabing"
                onChange={(e) => {
                  setPlaylistID(e.target.value)
                  console.log(e.target.value)
                }}
                color="secondary">
                </TextField>
                <Button
                  sx={{
                      padding: '0.6vmax 20vmax',
                      marginX: '10vw',
                  }}
                  fullWidth={false}
                  variant="contained"
                  color="secondary"
                  onClick={collabPlaylist}
                  type="submit">
                      <Typography
                          variant="h5"
                          sx={{
                              color: '#FFF',
                              fontWeight: 450,
                              margin: '0'
                          }}>
                          Retrieve Playlist
                      </Typography>
                  </Button>        
              </Box>
      );
    }

    return(

      <div>
        { getContent() }
      </div>
    )
}