import React, { useState, useEffect } from "react"
import { Button, Container, Box, createTheme, Grid, ThemeProvider, Typography} from "@mui/material"
import { useParams } from "react-router-dom"
import SearchCard from "../components/SearchCard";
import { DataObjectSharp, LibraryMusicOutlined } from "@mui/icons-material";
import { green } from "@mui/material/colors";

export default function Home() {

  const TOKEN = "https://accounts.spotify.com/api/token"
  const [token, setToken] = useState({})
  const [userData, setUserData] = useState({})
  const [connected, setConnected] = useState(false);

  var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
  var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
  var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
  var scopes = 'user-read-private user-read-email playlist-modify-private'

  // const params = new URLSearchParams(window.location.search);
  // const code = params.get('code')
  // let url = TOKEN;

  const AUTHORIZE = "https://accounts.spotify.com/authorize"
  let url = AUTHORIZE;
  url += '?client_id=' + client_id
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri)
  url += "&show_dialog=true"
  url += "&scope=" + scopes


  // const getToken = async (code) => {
  //   let url = TOKEN
  //   console.log(url)
  //   console.log(code)
  //     const result = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //               'Content-Type': 'application/x-www-form-urlencoded',
  //               'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  //       },
  //       body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
  //     })
  //     const data = await result.json();
  //     const tk = data['access_token']
  //     console.log(data)
  //     // fetch(`Logged/?code=${tk}`).then(res => {
  //     //   return res.json()}).then(data => {
  //     //       setUserData(data)
  //     //       console.log(data)})
  //   }


  //   const getToken3 = () => {
  //     if (token === undefined || token === null){
  //       const params = new URLSearchParams(window.location.search);
  //       const code = params.get('code')
  //       setToken(code)
  //     }
  //     let url = TOKEN
  //     console.log(url)
  //     console.log(token)
  //     if(token !== null && connected && Object.keys(userData).length === 0){
  //       fetch(url, {
  //         method: 'POST',
  //         headers: {
  //                     'Content-Type': 'application/x-www-form-urlencoded',
  //                     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  //         },
  //         body: `grant_type=authorization_code&code=${token}&redirect_uri=${redirect_uri}`
  //         }).then(res => {
  //           return res.json()
  //         }).then(data => {
  //           setUserData(data)
  //         })
  //         setConnected(true)
  //         console.log(connected)
  //   }
  //   console.log(userData)

  //       // fetch(`Logged/?code=${tk}`).then(res => {
  //       //   return res.json()}).then(data => {
  //       //       setUserData(data)
  //       //       console.log(data)})
  //     }



      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        let url = TOKEN
        console.log(url)
        console.log(code)
        console.log(userData)
        if(code !== null && !connected && Object.keys(userData).length === 0){
          fetch(url, {
            method: 'POST',
            headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
            }).then(res => {
              return res.json()
            }).then(data => {
              setToken(data)
              console.log(data)
              let tk = data['access_token']
              console.log(tk)
              fetch(`Logged/?code=${tk}`)
              .then(res => {
                return res.json()
              }).then(data => {
                setUserData(data)
                console.log(data)
              })
            })
      }
    }, [connected])

  





  //   const getToken2 = (code) => {
  //     let url = TOKEN;
  //     console.log(url)
  //     console.log(code)
  //     if(code !== null && !connected){  
  //       setConnected(true)
  //       fetch(url, {
  //         method: 'POST',
  //         headers: {
  //                 'Content-Type': 'application/x-www-form-urlencoded',
  //                 'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  //         },
  //         body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
  //       }).then(res => {
  //         return res.json()
  //       }).then(data => {
  //               console.log(data)
  //               const tk = data['access_token']
  //               console.log(tk)
  //               fetch(`Logged/?code=${tk}`).
  //               then(res => {
  //                 return res.json()
  //               }).
  //               then(data => {
  //                 setUserData(data)
  //                 console.log(data)
  //           })
  //       })
  //     }
  // }


  // const getUserData = () => {
  //   let tk = token['access_token']
  //   if(connected && Object.keys(userData).length === 0){
  //       fetch(`Logged/?code=${tk}`).
  //       then(res => {
  //         return res.json()}).
  //         then(data => {
  //           setUserData(data)
  //           console.log(data)
  //         })
  //   }

  // }

  // if(Object.keys(userData).length === 0 && code !== null){
  //   console.log("HELLO")
  //   getToken3(code)
  // }



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
            }
        </>
    );

    const getContent = () =>(
        <>
            {
              <Box>
                <img src={userData['images'][0]['url']} alt="Profile Pic"></img>
                <Typography>Welcome {userData['display_name']}</Typography>
                <Typography>Country: {userData['country']}</Typography>
                <Typography>Email: {userData['email']}</Typography>
                <Typography>Follower Count: {userData['followers']['total']}</Typography>
                <Typography></Typography>
              </Box>

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
                // header={getUserData()}
                content={Object.keys(userData).length === 0 ? getDefaultContent() : getContent() }
            />
        </Grid>
    )
}
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