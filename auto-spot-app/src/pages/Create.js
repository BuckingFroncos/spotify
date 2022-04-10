import { Grid, IconButton, Box, Typography, Button, ImageListItem, ImageListItemBar, ImageList, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import SearchCard from "../components/SearchCard"
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { display, width } from "@mui/system"

export default function Create() {
    const [input, setInput] = useState('')
    const [info, setInfo] = useState({})
    const [choice, setChoice] = useState('Artist')

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
                        backgroundColor: '#f5f5f5',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <FormControl sx={{ m: 1, flexShrink: 1}}>
                        <InputLabel id="Option-label">Option</InputLabel>
                        <Select
                            labelId="Option-label"
                            id="Option"
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
                    {Object.keys(info).map(( key ) => 
                        <a href={`/results/?name=${info[key][0]}&uri=${key}`} target="_blank">
                            <ImageListItem key={key}>
                            <img
                                    src={info[key][1].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        info[key][1][0]['url']}
                                    alt={info[key][1].length === 0 ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : 
                                        info[key][1][0]['url']}
                            />

                            <ImageListItemBar
                                title={info[key][0]}
                                actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                >
                                    <InfoOutlined/>
                                </IconButton>
                                }
                            />
                            </ImageListItem>
                        </a>
                    )}
                </ImageList>
            }
        </>
    );

    return(
        <Grid 
            item 
            xs={12} //Grid width, how much space an item should take based on device's size
            sx={{
                position: 'relative',
            }}
        >
            <SearchCard
                header={getHeader()}
                content={Object.keys(info).length === 0 || input === "" ? getDefaultContent() : getContent() }
            />
        </Grid>
    )
}