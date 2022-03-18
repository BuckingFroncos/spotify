import React, { useEffect, useState } from 'react';
import { TextField, Box, Typography, Button, ImageListItem, ImageListItemBar, ImageList, Container } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core';
import ArtistsList from './ArtistsList';


// Currently Displays Two Buttons and 1 text field.
// When submitting artist name in the text field, the name will appear on the console.
export default function ArtistSearch() {
    // const classes = useStyles()
    const [artist, setArtist] = useState(null)
    const [searched, setSearched] = useState(false)
    const [data, setData]= useState(null)

    const handleSearch = (e) => {
        e.preventDefault()
        if (artist) {
        }
    }
    //
    //http://project-env.eba-sn4repky.us-east-1.elasticbeanstalk.com/artistsearch/main?name=illenium

    useEffect(() => {
        if (searched){
            fetch(`artistsearch/main?name=${artist}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setData(data)

            })
            setSearched(false)
        }
    }, [searched]);

    return (
        <div>
        <h1>BuckingFroncos : Artist Search</h1>
        <Container>
            <Button
                onClick= {() => console.log("Clicked!")}
                variant='contained'
                sx={{
                    backgroundColor: 'green',
                    '&:hover': {
                        backgroundColor: '#11AA11',
                    }
                }}
                type="submit"
                fullwidth = 'true'
                startIcon = {<AddCircleOutlineRoundedIcon fontSize='large' />}>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#FFF',
                    }}>
                    Create a New Playlist
                </Typography>
            </Button>

            <form noValidate autoComplete='off' onSubmit={handleSearch}>
                <TextField
                    // inputProps = {{className: classes.input_text}}
                    sx={{
                            display: 'flex',
                            marginTop: '20px',
                            marginBottom: '10px',
                            color: '#1111DD',
                    }}
                    onChange={(e) => setArtist(e.target.value)}
                    label="Artist Name"
                    variant='outlined'
                    required>
                </TextField>

                <Button
                variant='contained'
                type="submit"
                sx={{
                    background: '#111DDD',
                    '&:hover': {
                        backgroundColor: '#1177FF',
                    }
                }}
                onClick={() => setSearched(true)}
                startIcon = {<SearchIcon color="Primary"></SearchIcon>}>
                    <Typography
                        variant="h6">
                        Search for Artist
                    </Typography>
                </Button>
            </form>
            {/* May Use Select prop of text field for genre and year */}
        </Container>
        <br></br>
        <Typography 
            variant='h4'>
            Search Results:
        </Typography>
        <div className="result">
            {data && <ArtistsList data={data}></ArtistsList>}
        </div>
    </div>
    )
}
