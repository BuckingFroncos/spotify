import { Grid, Box, Typography, Button, ImageListItem, ImageListItemBar, ImageList, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import SearchCard from "../components/SearchCard"
import {useNavigate} from "react-router-dom"
import './Create.css'

export default function Create() {
    const [input, setInput] = useState('')
    const [info, setInfo] = useState({})
    const [choice, setChoice] = useState('Artist')
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState(window.sessionStorage.getItem('playlist-name'))
    const id =  window.sessionStorage.getItem('playlist-id')
    const ownerToken = window.sessionStorage.getItem('token')
    const imageStyle = {
        borderRadius: '2% 2% 0px 0px',
        objectFit: 'cover',
        cursor: 'pointer',
        transition: 'opacity .3s linear',
    }

    const playlistCreated = (playlist) => {
        if (playlist !== null){
            return true
        }
        return false
    }

    const getHeader = () => {
        const handleSubmit = (e) =>{
            e.preventDefault()
            
            if(choice === 'Artist')
            {
                fetch(`artistsearch/main?name=${input}`)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setInfo(data)
                    console.log("In artist")
                })
            }
            else if(choice ==='Genre')
            {
                fetch(`artistsearch/main?genre=${input}`)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setInfo(data)
                    console.log("In genre")
                })
            }
            else if(choice === 'Year')
            {
                fetch(`artistsearch/main?year=${input}`)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setInfo(data)
                    console.log("In year")
                })
            }
        };

        const handleSelect = (e) => {
            e.preventDefault()
            setChoice(e.target.value)
        }

        return(
            <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <FormControl sx={{ m: 1, flexShrink: 1}}>
                        <InputLabel id="Filter-label">Filter</InputLabel>
                        <Select
                            labelId="Filter-label"
                            id="Filter"
                            value={choice}
                            defaultValue="Artist"
                            label="Choice"
                            onChange={handleSelect}
                        >
                            <MenuItem value="Artist">Artist</MenuItem>
                            <MenuItem value="Genre">Genre</MenuItem>
                            <MenuItem value="Year">Year</MenuItem>
                        </Select>
                    </FormControl>
                    <SearchBar
                        placeholder={`Search By ${choice}`}
                        onChange={(e) => e.target.value ? setInput(e.target.value) : setInfo({}) }
                        searchBarWidth='100%'
                        sx={{
                            flexGrow: 2,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    />
                    <Box>
                        <Button
                            variant='contained'
                            size='large'
                            type="submit"
                            sx={{ fontSize: '1.05rem', flexShrink: 0 }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    };

    const getDefaultContent = () =>(
        <>
            {
                <Typography 
                    align="center"
                    sx={{ margin: '40px 16px',  fontSize: '1.3rem'}}
                >
                    Nothing found
                </Typography>
            }
        </>
    );

    const getContent = () =>(
        <>
            {
                <ImageList
                    gap={15}
                    cols={3}
                >
                    {Object.keys(info).map(( key ) => 
                        <ImageListItem 
                            key={key}
                        >
                            <img id="song"
                                src={info[key][1].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        info[key][1][0]['url']}
                                alt={info[key][1].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        info[key][1][0]['url']}
                                style={imageStyle}
                                onClick={() => navigate(`/create/${info[key][0]}/${key}`)}
                            />
                            <ImageListItemBar
                                title={info[key][0]}
                            />
                        </ImageListItem>
                    )}
                </ImageList>
            }
        </>
    );

    return (

        <div>
            {
                playlistCreated(playlist) ? 
                (
                    <div style={{padding : "0px 0px 10px 0px"}}>  
                        <Box
                        sx={{
                            display : 'flex',
                            flexDirection : 'row',
                            flexWrap : 'nowrap',
                            justifyContent: 'space-between',
                        }}>
                        <Typography 
                        sx={{
                            borderBottom: '2px solid rgba(0, 0, 0, 0.15)',
                        }}variant="h6" color="secondary">Now Adding Songs to Playlist: {playlist}</Typography>
                        <Button
                        sx={{
                            marginY: '0',
                            fontWeight: 800,
                            "&:hover" : {
                                backgroundColor : "#673ab7",
                                color: 'white'
                            },
                            backgroundColor: 'secondary.main'
                        }}
                            fullWidth={false}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                window.sessionStorage.removeItem('playlist-id')
                                window.sessionStorage.removeItem('playlist-name')
                                setPlaylist(window.sessionStorage.getItem('playlist-name'))
                            }}
                            type="submit">
                            Done Adding Songs
                        </Button>  
                        </Box>
                        <Box
                        sx={{
                            display : 'flex',
                            flexDirection : 'column',
                            flexWrap : 'wrap',
                        }}>
                            <Typography 
                            sx={{
                                borderBottom: '2px solid rgba(0, 0, 0, 0.15)',
                            }}
                            variant="h6" 
                            color="secondary">Share to Collab:</Typography>
                            <Typography 
                            sx={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                width : '50%',
                            }}  
                            variant="p">
                            {id}&{ownerToken}
                            </Typography>
                        </Box>
                    </div>
                ) 
                : 
                (
                    <Typography 
                    sx={{
                        borderbottom: '2px solid rgba(0, 0, 0, 0.15)',
                        marginY: '1vh'
                    }}
                    variant="h6" color="secondary">No Playlist Has Been Created</Typography>
                )
            } 

        <Grid 
            item 
            xs={12}
            sx={{
                position: 'relative',
            }}
        >
            <SearchCard
                header={getHeader()}
                content={Object.keys(info).length === 0 || input === "" ? getDefaultContent() : getContent() }
            />
        </Grid>
        </div>
    )
}