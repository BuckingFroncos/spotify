import { Grid, IconButton, Box, Typography, Button, ImageListItem, ImageListItemBar, ImageList } from "@mui/material"
import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import SearchCard from "../components/SearchCard"
import RefreshIcon from '@mui/icons-material/Refresh'
import InfoOutlined from '@mui/icons-material/InfoOutlined'

export default function Create() {
    const [artist, setArtist] = useState('')
    const [info, setInfo] = useState({})

    const getHeader = () => {
        const handleSubmit = (e) =>{
            e.preventDefault()

            fetch(`artistsearch/main?name=${artist}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let clean = {
                    'uri': data[artist][0],
                    'name': artist,
                    'image': data[artist][1][0].url
                }
                setInfo(clean)
                console.log(clean)
            })
        };

        return(
            <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    height: '65px',
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
            >
                <SearchBar
                    placeholder="Search by Artist"
                    onChange={(e) => setArtist(e.target.value)}
                    searchBarWidth='720px'
                />
                <Box>
                    <Button
                        variant='contained'
                        size='large'
                        type="submit"
                        sx={{ fontSize: '1.05rem' }}
                    >
                        Search
                    </Button>
                    <IconButton>
                        <RefreshIcon/>
                    </IconButton>
                </Box>
            </Box>
        )
    };

    const getDefaultContent = () =>(
        <>
            {
                <Typography 
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                >
                    Search for an Artist
                </Typography>
            }
        </>
    );

    const getContent = () =>(
        <>
            {
                <ImageList>
                    <ImageListItem key={info.uri}>
                    <img
                        src={info.image}
                        alt={info.name}
                    />
                    <ImageListItemBar
                        title={info.name}
                        actionIcon={
                            <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <InfoOutlined/>
                            </IconButton>
                        }
                    />
                    </ImageListItem>
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
                header={getHeader()}
                content={ Object.keys(info).length === 0 || artist === "" ? getDefaultContent() : getContent() }
            />
        </Grid>
    )
}