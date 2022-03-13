import React from "react"
import { Card, CardHeader, CardContent,  Typography, CardMedia} from "@mui/material"
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(() => ({
    margin: 10,
    float: "left",
    width: 'auto',
}))

const StyledCardMedia = styled(CardMedia)(() => ({
    backgroundColor: 'violet',
    width: 'auto',
    height: 'auto'
}))

export default function CustomCard( song ){

    return(
        <div>
            <StyledCard>
                <CardHeader
                    title='dummy'
                    subheader='testing'
                />
                <StyledCardMedia
                    component='img'
                    image='https://cdn-icons-png.flaticon.com/512/43/43922.png'
                />
                <CardContent>
                    <Typography variant="body2" color='secondary'>
                        Testing Testing Testing Testing Testing Testing Testing Testing
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>
    )
}