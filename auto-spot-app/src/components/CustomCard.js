import React from "react"
import { Card, CardHeader, CardContent,  Typography, CardMedia} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { convertLength } from "@mui/material/styles/cssUtils"
import { boxSizing, padding } from "@mui/system"

const useStyles = makeStyles({
    card: {
        margin: 10,
        float: "left",
        width: 250,
    },
    media:{
        backgroundColor: 'violet',
        width: 'auto',
        height: 'auto'
    }
})

export default function CustomCard( song ){
    const classes = useStyles()

    return(
        <div>
            <Card className={classes.card}>
                <CardHeader
                    title='dummy'
                    subheader='testing'
                />
                <CardMedia
                    className={classes.media}
                    component='img'
                    image='https://cdn-icons-png.flaticon.com/512/43/43922.png'
                />
                <CardContent>
                    <Typography variant="body2" color='secondary'>
                        Testing Testing Testing Testing Testing Testing Testing Testing
                        Testing Testing Testing TestingTesting Testing Testing Testing
                        Testing Testing
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}