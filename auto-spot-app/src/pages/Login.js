import React from "react";
import { Typography } from "@mui/material";


export default function Login() {

    const logged =  () => {
        if(window.sessionStorage.length === 0){
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
                    sx={{ marginX: '10vw', marginY: '4vw', fontSize: '1.6rem'}}
                    >
                    Welcome User, <b style={{color: "#FFFF00"}}>Login to Spotify</b> to Get Started By Clicking on the <b style={{color: '#b39ddb'}}>Icon</b> on the Right Corner.
                    </Typography>
                )
            }
        </div>

    )
}