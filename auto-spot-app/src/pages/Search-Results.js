import { Grid, Typography, Card, Box, CardContent, CardMedia, IconButton, Button} from "@mui/material"
import React, { useState } from "react"
import SearchCard from "../components/SearchCard"
import { useParams } from "react-router-dom"
import { AddCircleOutlineRounded, ArrowBackRounded } from "@mui/icons-material"

export default function DisplayResults(){
    const [songs, setSongs] = useState({});
    const [retrieve, setRetrieve] = useState();
    const {name, uri} = useParams();
    const artist = undefined
    const audioStyle = {
        width:'100%',
        background: '#f1f3f4',
        gridColumn: '1 / 3', 
        gridRow: '2',
    };

    const getSongsList = () => {
        if (uri !== null && !retrieve){
            console.log(name)
            fetch(`/songsearch/?uri=${uri}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSongs(data)
                console.log(data)
            })
            setRetrieve(true)
        }


        return(
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}
            >
            
                <IconButton aria-label="back" onClick={() => {window.location.href = "/create"}}>
                    <ArrowBackRounded/>
                </IconButton>
                    
            </Box>
        )
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

    const addSong = (song) => {
        const token = window.sessionStorage.getItem('token')
        const userID = window.sessionStorage.getItem('userID')
        const playlist = window.sessionStorage.getItem('playlist-id')
        console.log(song)
        fetch(`/addSong/?token=${token}&name=${playlist}&user=${userID}&song=${song}`).then(res => {
            if(res){
                alert("Song Has Been Added")
            }
            else{
                alert("Song was not Added")
            }

        })

    }

    const addTopArtistsSongs = () => {
        const token = window.sessionStorage.getItem('token')
        const userID = window.sessionStorage.getItem('userID')
        const playlist = window.sessionStorage.getItem('playlist-id')
        fetch(`/addArtist/?token=${token}&name=${playlist}&user=${userID}&artist=${uri}`).then(res => {
            if(res){
                alert("Song Has Been Added")
            }
            else{
                alert("Song was not Added")
            }
        })

    }

    const getContent = () =>(
        <>
            {
                <Grid 
                    container 
                    rowSpacing={3}
                    columnSpacing={{xs: 1, sm: 2, md: 3}}
                >
                <Button sx={{
                    backgroundColor : '#1ed760',
                    gridColumn : '1 / 4',
                    gridRow : '3',
                    "&:hover" : {
                    backgroundColor : "#0da251",
                        },
                    }} fullWidth={true} endIcon={<AddCircleOutlineRounded/>} onClick={() => {addTopArtistsSongs()}}>Add {name}'s Top Tracks</Button>
                    {Object.keys(songs).map(( key ) => 
                        <Grid 
                            item key={key}
                            xs={2}
                            sm={4}
                            md={6}
                        >
                            <Card 
                                sx={{ 
                                    display: 'grid', 
                                    gridTemplateRows: '1fr', 
                                    gridTemplateColumns: '2fr 2fr 2fr',
                                    boxShadow: '10',
                                    background:'linear-gradient(to top left, rgba(229, 243, 238, 0.8), rgba(243, 241, 243, 0.8))',
                                    borderRadius:'10px 10px 10px 10px'
                                }}>
                                    <CardContent 
                                        sx={{ 
                                            gridColumn: '1 / 3', 
                                            gridRow: '1' 
                                        }}
                                    >
                                            <Typography component="div" variant="h5">
                                                {songs[key][0]}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {artist}
                                            </Typography>
                                    </CardContent>
                                    <audio 
                                        controls 
                                        src={songs[key][1]}
                                        style={audioStyle}
                                    />
                                    <CardMedia
                                        component="img"
                                        sx={{ 
                                            width: '100%', 
                                            gridColumn: '3 / 4', 
                                            gridRow: '1 / 3',
                                        }}
                                        image={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        songs[key][2]}
                                        alt={songs[key][2].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        songs[key][2]}
                                    />
                                    <Button sx={{
                                        backgroundColor : '#1ed760',
                                        gridColumn : '1 / 4',
                                        gridRow : '3',
                                        "&:hover" : {
                                            backgroundColor : "#0da251",
                                        },
                                    }} fullWidth={true} endIcon={<AddCircleOutlineRounded/>} onClick={() => {addSong(key)}}>Add Song</Button>
                            </Card>
                        </Grid>
                    )}
                </Grid>
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