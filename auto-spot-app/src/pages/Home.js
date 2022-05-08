import React, { useState} from "react"
import { Button, Box, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material"

export default function Home() {

  const [playlist, setPlaylist] = useState();
  const [playlistID, setPlaylistID] = useState();
  const [mode, setMode] = useState('New_Playlist');

  const createPlaylist = () => {
    if(playlist !== undefined && playlist !== ""){
      const token = window.sessionStorage.getItem('token')
      const userID = window.sessionStorage.getItem('userID')
      console.log(`${token} : ${userID} : ${playlist}`)
      fetch(`Createplaylist/?token=${token}&name=${playlist}&user=${userID}`)
      .then(res => {
        return res.json()
      }).then(data => {
        window.sessionStorage.setItem('playlist-id', data['id'])
        window.sessionStorage.setItem('playlist-name', playlist)
        window.sessionStorage.setItem('collabing', false)
        console.log(`${playlist} Has Been Created`)
        window.location.href = '/create'
      })
    }
    else {
      console.log(playlist)
    }

  } 

  const collabPlaylist = () => {
    if(playlistID !== undefined && playlistID !== "") {
    const details = playlistID.toString()
    const id = details.split('&')
    const playlist = id[0]
    const owner = id[1]
    //const token = window.sessionStorage.getItem('token')
    fetch(`/collab/?token=${owner}&id=${playlistID}`)
    .then(res => {
      if(res.status === 200) return res.text()
      else {
        alert(`There is no playlist with the ID: ${playlistID}`)
      }})
      .then(data => {
        if(data !== undefined){
          window.sessionStorage.setItem('playlist-id', playlist)
          window.sessionStorage.setItem('playlist-name', data)
          window.sessionStorage.setItem('collabOwnerToken', owner)
          window.sessionStorage.setItem('collabing', true)
          window.location.href = '/create'
        }})    
    }
  } 

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    if(mode === "New_Playlist"){
      createPlaylist()
    }
    else if(mode === "Collab_Playlist")
    {
      collabPlaylist()
    }
  }

  return(
    <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
    >
      <Typography
        variant="h5"
        color="secondary"
        component='h2'
        gutterBottom
        fontWeight={'Bold'}
      >
        Create A New Playlist or Collab On One
      </Typography>

      <FormControl
        sx={{
          paddingTop: 2,
          paddingBottom: 3
        }}
      >
        <FormLabel sx={{
          color: 'secondary.main'
        }}> Creation Mode </FormLabel>
        <RadioGroup sx={{
          background: 'secondary.main',
          color: 'secondary.main'
        }}
        value={mode} onChange={(e) => {
          setMode(e.target.value)
        }}>
          <FormControlLabel value="New_Playlist" control={<Radio/>} label="New Playlist" />
          <FormControlLabel value="Collab_Playlist" control={<Radio/>} label="Collab Playlist"/>
        </RadioGroup> 
      </FormControl>

      <TextField
          sx={{
            display: 'block',
            paddingBottom: 3
          }}
          id="Playlist-Field"
          variant="outlined"
          fullWidth
          required
          label={mode === "New_Playlist" ?  "Enter Playlist Name" :  "Enter Share Token To Start Collabing"}
          onChange={(e) => {
            if(mode === "New_Playlist"){
              setPlaylist(e.target.value)
              console.log(e.target.value)
            } else {
              setPlaylistID(e.target.value)
              console.log(e.target.value)
            }
          }}
          color="secondary">
      </TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        sx={{
          width: '15vw',
          marginTop: '1vh'
        }}
      >
        <Typography
            variant="h5"
            sx={{
                fontWeight: 480,
                margin: '0',
            }}>
            {mode === "New_Playlist" ?  'Create Playlist' :  "Find Playlist"}
        </Typography>
      </Button>   
    </Box>
  )
}