import React, { useState, useEffect, useRef } from "react"
import { Button, Box, createTheme, ThemeProvider, Typography, TextField} from "@mui/material"
import { useLocation } from "react-router-dom"
import { green } from "@mui/material/colors";

export default function Home() {

  const TOKEN = "https://accounts.spotify.com/api/token"
  const location = useLocation()
  const [token, setToken] = useState({})
  const [userData, setUserData] = useState({})
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code')
  console.log(location.state)

//   var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
//   var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
//   var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
//   var scopes = 'user-read-private user-read-email playlist-modify-private'


//   const AUTHORIZE = "https://accounts.spotify.com/authorize"
//   let url = AUTHORIZE;
//   url += '?client_id=' + client_id
//   url += "&response_type=code";
//   url += "&redirect_uri=" + encodeURI(redirect_uri)
//   url += "&show_dialog=true"
//   url += "&scope=" + scopes


    //   useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const code = params.get('code')
    //     let url = TOKEN
    //     console.log(url)
    //     console.log(code)
    //     console.log(userData)
    //     if(code !== null && !connected && Object.keys(userData).length === 0){
    //       fetch(url, {
    //         method: 'POST',
    //         headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    //         },
    //         body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
    //         }).then(res => {
    //           return res.json()
    //         }).then(data => {
    //           setToken(data)
    //           console.log(data)
    //           let tk = data['access_token']
    //           console.log(tk)
    //           setToken(tk)
    //           fetch(`Logged/?code=${tk}`)
    //           .then(res => {
    //             return res.json()
    //           }).then(data => {
    //             setUserData(data)
    //             console.log(data)
    //           })
    //         })
    //   }
    // }, [connected])


  const theme = createTheme({
    palette:{
      primary:{
        main: '#1ed760'
      },
      secondary: green
    }
  })

    // const userLogged = () => {
    //     const params = new URLSearchParams(window.location.search);
    //     const code = params.get('code')
    //     if(location.state !== null && Object.keys(location.state['code']).length !== 0) {
    //         return true
    //     }
    //     return false
    // }


    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     let code = params.get('code')
    //     console.log(location.state)
    //     if(location.state !== null){
    //         code = "HELLO"
    //     }

    // }, [connected])



      const getDefaultContent = () => {
        return (
            <>
                {
                  <ThemeProvider theme={theme}>
                    <Typography 
                        align="center"
                        sx={{ marginX: '10vw', marginY: '4vw', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                        Welcome User, Login to Spotify to Get Started By Clicking on the Icon on the Right Corner
                    </Typography>
                    </ThemeProvider>
                }
            </>
        );
      }


    const [playlist, setPlaylist] = useState();

    const createPlaylist = () => {
      fetch(`Createplaylist/?token=${token}&name=${playlist}&user=${userData['id']}`)
    }

    const getContent = () =>(
        <>
            {
              <Box>
                <TextField
                sx={{
                    margin: '2vmin',
                }}
                id="Playlist-Field"
                fullWidth={true}
                variant="outlined"
                required
                label="Playlist Name"
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
                  color="primary"
                  onClick={() => {createPlaylist()}}
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
              </Box>
            }
        </>
    );


    return(

        <Box>
            {Object.keys(userData).length !== 0 ?  getContent() : getDefaultContent()}
        </Box>
            // <Grid 
            //     item 
            //     xs={12} 
            //     sx={{
            //         position: 'relative',
            //     }}
            // >
            //     <SearchCard
            //         // header={getUserData()}
            //         content={Object.keys(userData).length === 0 ? getDefaultContent() : getContent() }
            //     />
            // </Grid>
    )
}