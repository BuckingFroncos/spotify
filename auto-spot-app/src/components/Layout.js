import React from 'react'
import { Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Avatar, Badge} from '@mui/material'
import { AddCircleOutlineOutlined, Home } from '@mui/icons-material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

const drawerWidth = 240

export default function Layout({ children }){
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Home',
            path: '/',
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
                        <IconButton 
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                        >
                            <Avatar alt="Login" src="/static/images/avatar/2.jpg" />
                        </IconButton>
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
                            onClick={() => navigate(item.path)}
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