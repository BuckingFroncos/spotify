import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'

export default function SearchBar({placeholder, onChange, searchBarWidth, sx}){
    return(
        <Box
            sx={sx}
        >
            <SearchIcon sx={{ marginRight: '10px' }}/>
            <Input
                placeholder={placeholder}
                onChange={onChange}
                sx={{
                    width: searchBarWidth,
                    fontSize:  '1.1rem',
                }}
                disableUnderline
            />
        </Box>
    )
}