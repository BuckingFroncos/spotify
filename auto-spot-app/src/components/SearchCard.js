import React from 'react'
import { Card, CardContent } from '@mui/material'

export default function SearchCard({header, content}){
    return(
        <Card
            sx={{
                width: '1050px',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '8px'
            }}
        >
            {header}
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}