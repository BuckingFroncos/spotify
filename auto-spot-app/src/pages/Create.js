import { Grid, IconButton, Box, Typography, Button, ImageListItem, ImageListItemBar, ImageList } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import SearchCard from "../components/SearchCard"
import RefreshIcon from '@mui/icons-material/Refresh'
import InfoOutlined from '@mui/icons-material/InfoOutlined'

export default function Create() {
    const [artist, setArtist] = useState('')
    const [info, setInfo] = useState([])
    const [searched, setSearch] = useState(false)

    useEffect(() => {
        if(searched){
            fetch(`artistsearch/main?name=${artist}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setInfo(data)
                console.log(info)
            })
        }

        setSearch(false)
    }, [searched])

    const getHeader = () => {
        const handleChange = (value) =>{
            console.log(value)
            setArtist(value)
        };

        return(
            <Box
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
                    onChange={(event) => handleChange(event.target.value)}
                    searchBarWidth='720px'
                />
                <Box>
                    <Button
                        variant='contained'
                        onClick={() => setSearch(true)}
                        size='large'
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

    const getContent = () =>(
        <>
            {
                info != [] && Object.keys(info).length ?
                        <ImageList>
                            <ImageListItem key={info[artist][1][0].url}>
                            <img
                                src={info[artist][1][0].url}
                                alt={artist}
                            />
                            <ImageListItemBar
                                title={artist}
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
                :
                    <Typography 
                        align="center"
                        sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                        Search for an Artist
                    </Typography>
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
                content={info && getContent()}
            />
        </Grid>
    )
}