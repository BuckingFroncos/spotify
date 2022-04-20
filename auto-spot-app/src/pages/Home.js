import React, { useState } from "react"
import { Button, Container, createTheme, Grid, ThemeProvider, Typography} from "@mui/material"
import { useParams } from "react-router-dom"
import SearchCard from "../components/SearchCard";
import { LibraryMusicOutlined } from "@mui/icons-material";
import { green } from "@mui/material/colors";

export default function Home() {
  
  // const [retrieve, setRetrieve] = useState(false);
  // const params = new URLSearchParams(window.location.search);
  // const test = params.get('code')
  // const {code} = useParams();
  // const [userInfo, setuserInfo] = useState({})
  // const [connected, setConnected] = useState(false);
  // const getUserData = () => {
  //       if(!connected && !retrieve){
  //         console.log(test)
  //           fetch(`SpotifyConnect/`)
  //           .then(res => {
  //               return res.json();
  //           })
  //           .then(data => {
  //             setuserInfo(data)
  //             console.log("POG")
  //             setRetrieve(true)
  //           })
  //           // if(Object.keys(userInfo).length !== 0){
  //             setConnected(true)
  //           // }
            
  //       }
  //       else {
  //           console.log('Connection Has Already Been Established')
  //           console.log(code)
  //       }
  // }'grant_type=authorization_code&code=' + code +'&redirect_uri=' + redirect_uri

  const TOKEN = "https://accounts.spotify.com/api/token"
  const [userToken, setUserToken] = useState({})
  const [userData, setUserData] = useState({})
  const [connected, setConnected] = useState(false);
  const connectToSpotify = () => {
      if(!connected){
          fetch(`SpotifyConnect/`)
          .then(res => {
              return res.json();
          })
          .then(data => {
              console.log(data)
              console.log('Connection Has Been Established')
          })
          setConnected(true)
      }
  }
  const getToken = async (code, redirect_uri) => {
    // var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
    // var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
    // var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
    console.log(url)
    console.log(code)
    if (!connected){
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
          },
          body: 'grant_type=client_credentials'
        })
        
        const data = await result.json();
        setConnected(true)
        const tk = data['access_token']
        console.log(tk)
        fetch(`Logged/?code=${tk}`).then(res => {
          return res.json()
        }).then(data => {
          setUserData(data)
          console.log(data)
    })
    }
}

const getUserData = () => {
  const tk = userToken['access_token']
  fetch(`Logged/?code${tk}`).then(res => {
    return res.json()
  }).then(data => {
    setUserData(data)
    console.log(data)
  })
}



  var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
  var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
  var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
  var scopes = 'user-read-private user-read-email playlist-modify-private'

  const params = new URLSearchParams(window.location.search);
  const grant_type = "authorization_code"
  const code = params.get('code')
  const content_type = 'application/x-www-form-urlencoded'
  let url = TOKEN;
  if(Object.keys(userToken).length === 0 && !connected && code != null){
    getToken(code, redirect_uri)
    // getUserData()
  }
  // url += '?grant_type=' + grant_type
  // url += "&code=" + code;
  // url += "&redirect_uri=" + encodeURI(redirect_uri)
  // url += "&Content-Type=" + content_type

  const theme = createTheme({
    palette:{
      primary:{
        main: '#1ed760'
      },
      secondary: green
    }
  })



      const getDefaultContent = () =>(
        <>
            {
              <ThemeProvider theme={theme}>
                <Typography 
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                >
                    Welcome User, Login to Spotify to Get Started:
                </Typography>
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
                </ThemeProvider>
            }
        </>
    );

    const getContent = () =>(
        <>
            {
                <Grid
                    container 
                    rowSpacing={3}
                    columnSpacing={{xs: 1, sm: 2, md: 3}}
                >
                  <Typography>Hoell</Typography>
                </Grid>
            }
        </>
    );


    return(
        <Grid 
            item 
            xs={12} 
            sx={{
                position: 'relative',
            }}
        >
            <SearchCard
                // header={getToken()}
                content={Object.keys(userToken).length === 0 ? getDefaultContent() : getContent() }
            />
        </Grid>
    )
  
  // return (
  //   <Container>
  //     {/* <Grid container>  
  //       <Grid item>
  //         <CustomCard/>
  //       </Grid>
  //       <Grid item>
  //         <CustomCard/>
  //       </Grid>
  //       <Grid item>
  //         <CustomCard/>
  //       </Grid>
  //     </Grid> */}
  //     {/* <SearchCard header={getToken(code, redirect_uri)} content={"hello"}></SearchCard> */}
  //   </Container>
  // )
}