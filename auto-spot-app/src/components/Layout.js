import React, { useState, useEffect } from 'react'
import { Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Avatar, Badge} from '@mui/material'
import { AccountCircleOutlined, AddCircleOutlineOutlined, Home } from '@mui/icons-material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Login from '../pages/Login';
import { Button } from '@mui/material';

const drawerWidth = 240

export default function Layout({ children }){
    const navigate = useNavigate()
    const location = useLocation()

    const TOKEN = "https://accounts.spotify.com/api/token"
    const [token, setToken] = useState({})
    const [userData, setUserData] = useState({})
  
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

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/"
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        let url = TOKEN
        console.log(url)
        console.log(code)
        console.log(userData)
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
              setToken(data)
              console.log(data)
              let tk = data['access_token']
              window.localStorage.setItem("token", tk);
              console.log(tk)
              setToken(tk)
              fetch(`Logged/?code=${tk}`)
              .then(res => {
                return res.json()
              }).then(data => {
                setUserData(data)
                console.log(data)
                let image = data['images'][0]['url'] 
                window.localStorage.setItem("account-image", image)
                window.localStorage.setItem("userID", data['id'])
              })
            })
      }
    }, [])

    const menuItems = [
        // { 
        //     text: 'Login',
        //     path: '/',
        //     icon: <AccountCircleOutlined color="secondary"/>
        // },
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

    return(
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <AppBar
                color='primary'
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`
                }}
                elevation={0}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                            Welcome to Our Music Automated Collab Tool
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton 
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={2} color="error">
                                <PlaylistAddIcon/>
                            </Badge>
                        </IconButton>
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
                            <Avatar alt="/static/images/avatar/2.jpg" src={Object.keys(userData).length !== 0 ? userData['images'][0]['url'] : "/static/images/avatar/2.jpg"}/>
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
                        boxSizing: 'border-box'
                    },
                }}
                variant="permanent"
                anchor='left'
            >
                <div>
                    <Typography 
                        variant='h5'
                        sx={{
                            padding: (theme) => theme.spacing(2)
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
                                if(window.localStorage.length === 0)
                                {
                                    alert("Please Login First")
                                }
                                else
                                {
                                    navigate(item.path)
                                }
                            }}
                            sx={location.pathname === item.path ? {background: '#f4f4f4'} : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box 
                sx={{
                    background: '#f9f9f9',
                    width: '100%',
                    padding: (theme) => theme.spacing(3)
                }}
            >
                <Box sx= {theme => theme.mixins.toolbar}></Box>
                {children}
            </Box>
        </Box>
    );
}