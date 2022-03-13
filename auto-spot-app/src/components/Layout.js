import React from 'react'
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material/'
import { makeStyles } from '@mui/styles'
import {AddCircleOutlineOutlined, Home} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%'
    },
    drawer: {
        width: drawerWidth
    },
    drawerpaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    }
})

export default function Layout({ children }){
    const classes = useStyles()
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
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='left'
                classes={{paper: classes.drawerpaper}}
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

            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
}