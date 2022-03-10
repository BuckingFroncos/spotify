import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


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
export default function PlaylistCreate() {
    const classes = useStyles()
    const [artist, setArtist] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()

        if (artist) {
            console.log(artist)
        }
    }

    return (
        <div>
        <h1>BuckingFroncos : Playlist Creator</h1>
        <Container>
            <Button
                onClick= {() => console.log("You Clicked Me!")}
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

            <form noValidate autoComplete='on' onSubmit={handleSearch}>
                <TextField 
                    inputProps = {{className: classes.input_text}}
                    onChange={(e) => setArtist(e.target.value)}
                    className={classes.field}
                    label="Artist Name"
                    variant='outlined'
                    color='secondary'
                    required>
                </TextField>


                <Button
                variant='contained'
                type="submit" 
                color='secondary'
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
        </div>
        
    )
}
