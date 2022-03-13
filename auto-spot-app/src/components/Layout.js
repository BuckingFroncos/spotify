import React from 'react'
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {AddCircleOutlineOutlined, Home} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

const drawerWidth = 240

export default function Layout({ children }){
    const navigate = useNavigate()

    const menuItems = [
        {
            text: 'Home',
            path: '/',
            icon: <Home color="secondary"/>
        },
        {
            text: 'Create Playlist',
            icon: <AddCircleOutlineOutlined color = "secondary"/>
        }
    ]

    return(
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <Drawer
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper':{
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="permanent"
                anchor='left'
            >
                <div>
                    <Typography variant='h5'>
                        Bucking Froncos
                    </Typography>
                </div>
                <List>
                    {menuItems.map(item => (
                        <ListItem 
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box 
                sx={{
                    background: '#f9f9f9',
                    width: '100%'
                }}
            >
                {children}
            </Box>
        </Box>
    );
}