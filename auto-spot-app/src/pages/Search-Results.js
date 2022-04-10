import { Grid, IconButton, Typography, Container, Card, Box, CardContent, CardMedia, ImageList, ImageListItem, ImageListItemBar} from "@mui/material"
import { PlayArrow } from "@mui/icons-material";
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
                // <ImageList>
                //     {Object.keys(songs).map(( key ) => 
                //         <ImageListItem key={key}>
                //         <audio controls src={songs[key][1]}></audio>
                //         <img
                //             src={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                //             songs[key][2]}
                //             alt={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                //             songs[key][2]}
                //         />
                //         <ImageListItemBar
                //             title={songs[key][0]}
                //             subtitle={artist}
                //         />
                //         </ImageListItem>
                //     )}
                // </ImageList>

                <Container>
                    <Grid container>
                        {Object.keys(songs).map(( key ) => 
                            <Grid item key={key} >
                                <Card sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {songs[key][0]}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {artist}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            <audio controls src={songs[key][1]}></audio>
                                        </Box>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 200, display:'flex'}}
                                        image={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        songs[key][2]}
                                        alt={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        songs[key][2]}
                                    />
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
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