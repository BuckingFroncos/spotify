import { Grid, IconButton, Typography, ImageListItem, ImageListItemBar, ImageList } from "@mui/material"
import React, { useState } from "react"
import SearchCard from "../components/SearchCard"

export default function DisplayResults(){
    const [songs, setSongs] = useState({});
    const [retrieve, setRetrieve] = useState();
    const params = new URLSearchParams(window.location.search);
    const artist = params.get('name')
    const uri = params.get('uri')

    const getSongsList = () => {
        if (uri !== null && artist !== null && !retrieve){
            fetch(`/songsearch/?uri=${uri}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSongs(data)
                console.log(`Retrieved ${artist}'s Songs`)
            })
            setRetrieve(true)
        }
    }

    const getDefaultContent = () =>(
        <>
            {
                <Typography 
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                >
                    Nothing found
                </Typography>
            }
        </>
    );

    const getContent = () =>(
        <>
            {
                <ImageList>
                    {Object.keys(songs).map(( key ) => 
                        <ImageListItem key={key}>
                        <audio controls src={songs[key][1]}></audio>
                        <img
                                src={songs[key][2]}
                                alt='https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
                        />
                        <ImageListItemBar
                            title={songs[key][0]}
                            actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <songsOutlined/>
                                </IconButton>
                            }
                        />
                        </ImageListItem>
                    )}
                </ImageList>
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
                header={getSongsList()}
                content={Object.keys(songs).length === 0 ? getDefaultContent() : getContent() }
            />
        </Grid>
    )
};