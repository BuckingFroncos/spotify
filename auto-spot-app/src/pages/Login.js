import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const logged =  () => {
        if(window.sessionStorage.length === 0){
            console.log("NO USER HAS LOGGED IN")
            return false
        }
        else {
            return true
        }

    }

    return(
        <div>
            {
                logged() ? window.location.href = '/home' : 
                (<Typography 
                    align="center"
                    sx={{ marginX: '10vw', marginY: '4vw', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                    Welcome User, Login to Spotify to Get Started By Clicking on the Icon on the Right Corner.
                    You Should See You Spotify Profile Image.
                    Click Home Tab to Begin Creating Playlists
                    </Typography>
                )
            }
        </div>

    )
}