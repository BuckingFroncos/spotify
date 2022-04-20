import React, { useState } from "react";
import { Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { LibraryMusicOutlined, } from '@mui/icons-material';

// Having curly braces in as parameters means that you are created props/properites for this react component/function
export default function Login() {
    
    const theme = createTheme({
        palette:{
          primary:{
            main: '#1ed760'
          },
          secondary: blue
        }
      })

    var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
    var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
    var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
    var scopes = 'user-read-private user-read-email playlist-modify-private'

    // Adding Parameters to request access to user's spotify information
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    let url = AUTHORIZE;
    url += '?client_id=' + client_id
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri)
    url += "&show_dialog=true"
    url += "&scope=" + scopes


    // const [connected, setConnected] = useState(false);
    // const [userToken, setuserToken] = useState();
    // const connectToSpotify = () => {
    //     if(!connected){
    //         fetch(`SpotifyConnect/`)
    //         // .then(res => {
    //         //     return res.json();
    //         // })
    //         // .then(data => {
    //         //     setuserToken(data)
    //         //     console.log('Connection Has Been Established')
    //         // })
    //         setConnected(true)
    //     }
    // }

    return(
        // <ThemeProvider theme={theme}>
        // <Box sx={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     padding: '1vmin 3vmin',
        //     padding: '3vmax 5vmax',
        //     }}>

        //     <Paper 
        //         sx={{
        //             padding: '1vmin 10vmin',
        //             padding: '3vmax 15vmax',
        //         }}
        //         variant='elevation'
        //         elevation={8}>


        //         <Typography
        //         sx={{
        //             textAlign: 'center',
        //             margin: '0vh 0vh 1vmax',
        //         }}
        //         variant='h2'
        //         color='secondary'
        //         >
        //             Spotipy Login
        //         </Typography>
        //         {/* Configure TextFields into Form control and input rather than text fields */}
        //         <TextField
        //         sx={{
        //             margin: '2vmin',
        //         }}
        //         id="Username-Field"
        //         fullWidth={true}
        //         variant="outlined"
        //         required
        //         label="Username"
        //         color="secondary">
        //         </TextField>

        //         {/* Will Add Hide/Show Password Icon feature */}
        //         <TextField
        //         sx={{
        //             margin: '2vmin',
        //         }}
        //         id="Password-Field"
        //         variant="outlined"
        //         fullWidth={true}
        //         required
        //         label="Password"
        //         color="secondary">
        //         </TextField>

        //         <a href="">
        //             <Button
        //             sx={{
        //                 padding: '0.25vmin 5vmin',
        //                 padding: '0.6vmax 10vmax',
        //                 margin: '2vmin',
        //             }}
        //             onClick={() => {
        //                 console.log("Clicked")
        //                 if(!connected){
        //                     connectToSpotify()
        //                 }
        //             }}
        //             fullWidth={true}
        //             variant="contained"
        //             color="secondary"
        //             type="submit"
        //             >Sign In</Button>
        //         </a>
        //     </Paper>
        // </Box>
        // </ThemeProvider>
        
        <ThemeProvider theme={theme}>
            <a href={url}>
                <Button
                sx={{
                    padding: '0.6vmax 20vmax',
                    marginX: '10vw',
                }}
                fullWidth={false}
                endIcon={
                    <LibraryMusicOutlined sx={{
                        transform: 'scale(1.5)',
                        marginLeft: '0.5vw'
                    }}/> }
                variant="contained"
                color="primary"
                type="submit">
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#FFF',
                            fontWeight: 450,
                            margin: '0'
                        }}>
                        Connect to Spotify
                    </Typography>
                </Button>  
            </a>
        </ThemeProvider>
    )
}