import React, { useState } from "react";
import { Box, Button, Paper, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { LibraryMusic, LibraryMusicIcon, LibraryMusicOutlined, LibraryMusicRounded, MusicNote } from '@mui/icons-material';

// Having curly braces in as parameters means that you are created props/properites for this react component/function
export default function Login({content}) {

    const theme = createTheme({
        palette:{
          primary:{
            main: '#1ed760'
          },
          secondary: blue
        }
      })

    const [connected, setConnected] = useState(false);
    const [userToken, setuserToken] = useState();
    const connectToSpotify = () => {
        if(!connected){
            fetch(`SpotifyConnect/`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setuserToken(data)
                console.log('Connection Has Been Established')
                console.log(`User Connected. Token:${userToken}\n`)
            })
            setConnected(true)
        }
        else {
            console.log('Connection Has Already Been Established')
        }
    }

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
                <Button
                sx={{
                    padding: '0.6vmax 20vmax',
                    marginX: '10vw',
                }}
                onClick={() => {
                    console.log("Clicked")
                    if(!connected){
                        connectToSpotify()
                    }
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
        </ThemeProvider>
    )
}