import React from "react";
import { Box, Button, Paper, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

// Having curly braces in as parameters means that you are created props/properites for this react component/function
export default function Login({content}) {

    const theme = createTheme({
        palette:{
          primary:{
            main: '#fefefe'
          },
          secondary: blue
        }
      })

    return(
        <ThemeProvider theme={theme}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1vmin 3vmin',
            padding: '3vmax 5vmax',
            }}>

            <Paper 
                sx={{
                    padding: '1vmin 10vmin',
                    padding: '3vmax 15vmax',
                }}
                variant='elevation'
                elevation={8}>


                <Typography
                sx={{
                    textAlign: 'center',
                    margin: '0vh 0vh 1vmax',
                }}
                variant='h2'
                color='secondary'
                >
                    Spotipy Login
                </Typography>
                {/* Configure TextFields into Form control and input rather than text fields */}
                <TextField
                sx={{
                    margin: '2vmin',
                }}
                id="Username-Field"
                fullWidth={true}
                variant="outlined"
                required
                label="Username"
                color="secondary">
                </TextField>

                {/* Will Add Hide/Show Password Icon feature */}
                <TextField
                sx={{
                    margin: '2vmin',
                }}
                id="Password-Field"
                variant="outlined"
                fullWidth={true}
                required
                label="Password"
                color="secondary">
                </TextField>

                <Button
                sx={{
                    padding: '0.25vmin 5vmin',
                    padding: '0.6vmax 10vmax',
                    margin: '2vmin',
                }}
                onClick={() => {
                    console.log("Clicked")
                }}
                fullWidth={true}
                variant="contained"
                color="secondary"
                type="submit"
                >Sign In</Button>
            </Paper>
        </Box>
        </ThemeProvider>
    )
}