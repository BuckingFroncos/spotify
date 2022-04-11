import { Grid, Typography, Card, Box, CardContent, CardMedia, ImageList, ImageListItem, ImageListItemBar} from "@mui/material"
import React, { useState } from "react"
import SearchCard from "../components/SearchCard"

export default function DisplayResults(){
    const [songs, setSongs] = useState({});
    const [retrieve, setRetrieve] = useState();
    const params = new URLSearchParams(window.location.search);
    const artist = params.get('name')
    const uri = params.get('uri')
    const audioStyle = {
        width:'100%',
        background: '#f1f3f4'
    };

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
                <ImageList gap={15}>
                    {Object.keys(songs).map(( key ) => 
                        <ImageListItem key={key}>
                            <img
                                src={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                songs[key][2]}
                                alt={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                songs[key][2]}
                            />
                            <ImageListItemBar
                                title={songs[key][0]}
                                subtitle={artist}
                                position='top'
                                sx={{
                                    background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                            />
                            <audio 
                                controls 
                                src={songs[key][1]}
                                style={audioStyle}
                            />
                        </ImageListItem> 
                    )}
                </ImageList>

                // <Grid 
                //     container 
                //     rowSpacing={3}
                //     columnSpacing={{xs: 1, sm: 2, md: 3}}
                // >
                //     {Object.keys(songs).map(( key ) => 
                //         <Grid 
                //             item key={key}
                //             xs={2}
                //             sm={4}
                //             md={6}
                //         >
                //             <Card sx={{ display: 'flex',}}>
                //                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                //                     <CardContent sx={{ flex: '1 0 auto' }}>
                //                         <Typography component="div" variant="h5">
                //                             {songs[key][0]}
                //                         </Typography>
                //                         <Typography variant="subtitle1" color="text.secondary" component="div">
                //                             {artist}
                //                         </Typography>
                //                     </CardContent>
                //                     <audio 
                //                         controls 
                //                         src={songs[key][1]}
                //                         style={audioStyle}
                //                     />
                //                 </Box>
                //                 <CardMedia
                //                     component="img"
                //                     sx={{ width: '50%', display:'flex'}}
                //                     image={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                //                     songs[key][2]}
                //                     alt={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                //                     songs[key][2]}
                //                 />
                //             </Card>
                //         </Grid>
                //     )}
                // </Grid>
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