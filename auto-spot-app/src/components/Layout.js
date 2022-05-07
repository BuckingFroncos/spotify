import React, { useState, useEffect } from 'react'
import { Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Avatar, Badge} from '@mui/material'
import { AddCircleOutlineOutlined, Home } from '@mui/icons-material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Button } from '@mui/material';

const drawerWidth = 240

export default function Layout({ children }){
    const navigate = useNavigate()
    const location = useLocation()

    const TOKEN = "https://accounts.spotify.com/api/token"
    const [userData, setUserData] = useState({})
  
    var client_id = 'b1276abbd1904e0194659f0381e8f6f8'; // Your client id
    var client_secret = '1b81013fb5b447029cd9b1cbe9976c39'; // Your secret
    var redirect_uri = 'http://localhost:3000/'; // Your redirect uri
    var scopes = 'user-read-private user-read-email playlist-modify-private playlist-modify-public'
  
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    let url = AUTHORIZE;
    url += '?client_id=' + client_id
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri)
    url += "&show_dialog=true"
    url += "&scope=" + scopes

    const logout = () => {
        window.sessionStorage.clear();
        window.location.href = "/"
    }

    const logged = () => {
        console.log(window.location.href)
        if(window.sessionStorage.length !== 0 && window.location.href === 'http://localhost:3000/?code'){
            window.location.href = "/home";
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        let url = TOKEN
        if(code !== null && Object.keys(userData).length === 0){
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
              let tk = data['access_token']
              window.sessionStorage.setItem("token", tk);
              console.log(tk)
              fetch(`Logged/?code=${tk}`)
              .then(res => {
                return res.json()
              }).then(data => {
                setUserData(data)
                console.log(data)
                let image = data['images'][0]['url'] 
                window.sessionStorage.setItem("account-image", image)
                window.sessionStorage.setItem("userID", data['id'])
                window.location.href = "http://localhost:3000/"
              })
            })
      }
    }, [])

    const menuItems = [
        {
            text: 'Home',
            path: '/home',
            icon: <Home color="secondary"/>
        },
        {
            text: 'Create Playlist',
            path: '/create',
            icon: <AddCircleOutlineOutlined color = "secondary"/>
        }, 
    ]

    const getImage = () => {
        if(Object.keys(userData).length !== 0){
            return userData['images'][0]['url']
        }
        else if(window.sessionStorage.getItem('account-image') !== null){
            return window.sessionStorage.getItem('account-image')
        }

        return "/static/images/avatar/2.jpg"

    }


    return(
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <AppBar
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`
                }}
                elevation={0}
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                            Spotify Automated Collab Tool
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <IconButton 
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={2} color="error">
                                <PlaylistAddIcon/>
                            </Badge>
                        </IconButton> */}
                        <Button color="secondary" onClick={logout}>
                            Log Out
                        </Button>
                        <a href={url}>
                        <IconButton 
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                        >
                            <Avatar alt="/static/images/avatar/2.jpg" src={getImage()}/>
                        </IconButton>
                        </a>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper':{
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor='left'
            >
                <div>
                    <Typography 
                        variant='h5'
                        sx={{
                            padding: (theme) => theme.spacing(2),
                        }}  
                    >
                        Bucking Froncos
                    </Typography>
                </div>
                <List>
                    {menuItems.map(item => (
                        <ListItemButton
                            key={item.text}   
                            onClick={() => {
                                if(window.sessionStorage.length === 0)
                                {
                                    alert("Please Login First")
                                }
                                else
                                {
                                    navigate(item.path)
                                }
                            }}
                            sx={location.pathname === item.path ? {background: '#212121'} : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography sx={{fontSize: 18 }}>
                                {item.text}
                            </ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box 
                sx={{
                    width: '100%',
                    padding: (theme) => theme.spacing(3)
                }}
            >
                <Box sx= {theme => theme.mixins.toolbar}></Box>
                {children}
            </Box>
            {logged()}
        </Box>
    );
}