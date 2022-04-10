import React from 'react'
import { Card, CardContent } from '@mui/material'

export default function SearchCard({header, content}){
    return(
        <Card
            sx={{
                width: '100%',
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