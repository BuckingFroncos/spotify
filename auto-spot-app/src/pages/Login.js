import React from "react";
import { Typography, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

// Having curly braces in as parameters means that you are created props/properites for this react component/function
export default function Login() {
    
    // const theme = createTheme({
    //     palette:{
    //       primary:{
    //         main: '#1ed760'
    //       },
    //       secondary: blue
    //     }
    //   })

    // var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
    // var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
    // var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
    // var scopes = 'user-read-private user-read-email playlist-modify-private'

    // // Adding Parameters to request access to user's spotify information
    // const AUTHORIZE = "https://accounts.spotify.com/authorize"
    // let url = AUTHORIZE;
    // url += '?client_id=' + client_id
    // url += "&response_type=code";
    // url += "&redirect_uri=" + encodeURI(redirect_uri)
    // url += "&show_dialog=true"
    // url += "&scope=" + scopes


    return(
        <Typography 
        align="center"
        sx={{ marginX: '10vw', marginY: '4vw', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
        >
        Welcome User, Login to Spotify to Get Started By Clicking on the Icon on the Right Corner.
        You Should See You Spotify Profile Image.
        Click Home Tab to Begin Creating Playlists
        </Typography>
        // <ThemeProvider theme={theme}>
        //     <a href={url}>
        //         <Button
        //         sx={{
        //             padding: '0.6vmax 20vmax',
        //             marginX: '10vw',
        //         }}
        //         fullWidth={false}
        //         endIcon={
        //             <LibraryMusicOutlined sx={{
        //                 transform: 'scale(1.5)',
        //                 marginLeft: '0.5vw'
        //             }}/> }
        //         variant="contained"
        //         color="primary"
        //         type="submit">
        //             <Typography
        //                 variant="h5"
        //                 sx={{
        //                     color: '#FFF',
        //                     fontWeight: 450,
        //                     margin: '0'
        //                 }}>
        //                 Connect to Spotify
        //             </Typography>
        //         </Button>  
        //     </a>
        // </ThemeProvider>
    )
}