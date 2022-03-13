import React from 'react'
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { makeStyles } from '@mui/styles';

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

    const menuItems = [
        {
            text: 'Home',
            path: '/'
        },
        {
            text: 'Create Playlist',
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
                        testing 
                    </Typography>
                </div>
                
                <List>

                </List>

            </Drawer>

            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
}