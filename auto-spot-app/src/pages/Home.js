import React, { useState} from "react"
import { Button, Box, Typography, TextField, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material"
import { create } from "@mui/material/styles/createTransitions";


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
        console.log("HERE")
        return res.json()
      }).then(data => {
        console.log(data)
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
    if(playlistID !== undefined && playlistID !== ""){
      const pl_id  = playlistID.toString()
      const id = pl_id.split('&')
      const play = id[0]
      const owner = id[1]
      console.log(play)
      console.log(owner)
      //const token = window.sessionStorage.getItem('token')
      fetch(`/collab/?token=${owner}&id=${playlistID}`)
      .then(res => {
        if(res.status === 200) return res.text()
        else {
          alert(`There is no playlist with the ID: ${playlistID}`)
        }
      }).then(data => {
        console.log(data)
        window.sessionStorage.setItem('playlist-id', playlistID)
        window.sessionStorage.setItem('playlist-name', data)
        window.sessionStorage.setItem('collabOwnerToken', owner)
        window.sessionStorage.setItem('collabing', true)
        window.location.href = '/create'
      })
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
        variant="h6"
        color="secondary"
        component='h2'
        gutterBottom
      >
        Create a new Playlist or Collab on one
      </Typography>

      <FormControl>
        <FormLabel> Creation Mode </FormLabel>
        <RadioGroup value={mode} onChange={(e) => setMode(e.target.value)}>
          <FormControlLabel value="New_Playlist" control={<Radio/>} label="New Playlist" />
          <FormControlLabel value="Collab_Playlist" control={<Radio/>} label="Collab Playlist"/>
        </RadioGroup> 
      </FormControl>

      <TextField
          sx={{
            display: 'block',
          }}
          id="Playlist-Field"
          variant="outlined"
          fullWidth
          required
          label={mode === "New_Playlist" ?  "Enter Playlist Name" :  "Enter Share Token To Start Collabing"}
          onChange={(e) => {
            setPlaylist(e.target.value)
            console.log(e.target.value)
          }}
          color="secondary">
      </TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
      >
        <Typography
            variant="h5"
            sx={{
                fontWeight: 450,
                margin: '0',
            }}>
            Create Playlist
        </Typography>
      </Button>   
    </Box>
  )
}