import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ArtistsList from './ArtistsList';


const useStyles = makeStyles({
    btn: {
        backgroundColor: 'green'
    },
    text: {
        color: 'white'
    },
    input_text: {
        color: '#1111FF'
    },
    field: {
        display: 'flex',
        marginTop: 20,
        marginBottom: 10,
    },

    container: {
        display: 'flex'
    }

})

// Currently Displays Two Buttons and 1 text field.
// When submitting artist name in the text field, the name will appear on the console.
export default function ArtistSearch() {
    const classes = useStyles()
    const [artist, setArtist] = useState(null)
    const [searched, setSearched] = useState(false)

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
                setArtist(data)
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
                className={classes.btn}
                color="primary"
                type="submit"
                fullwidth = 'true'
                startIcon = {<AddCircleOutlineRoundedIcon fontSize='large' />}>
                <Typography
                    variant="h6"
                    className={classes.text}>
                    Create a New Playlist
                </Typography>
            </Button>

            <form noValidate autoComplete='off' onSubmit={handleSearch}>
                <TextField
                    inputProps = {{className: classes.input_text}}
                    className={classes.field}
                    onChange={(e) => setArtist(e.target.value)}
                    label="Artist Name"
                    variant='outlined'
                    color='secondary'
                    required>
                </TextField>

                <Button
                variant='contained'
                type="submit"
                color='secondary'
                onClick={() => setSearched(true)}
                startIcon = {<SearchIcon color="Primary"></SearchIcon>}>
                <Typography
                    variant="h6"
                    className={classes.text}>
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
        {/* <Container>
            <div className="result">
                {artist && <ArtistsList artists=artist></ArtistsList>}
            </div>
        </Container> */}
        </div>
    )
}
