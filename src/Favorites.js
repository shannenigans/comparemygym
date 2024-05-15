import React from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';

import GymCard from './GymCard';

export default function Favorites() {
    const [ favGyms, setFavGyms ] = React.useState([]);
    const [ showSpinner, setShowSpinner ] = React.useState(true);

    React.useState(() => {
        fetch('http://localhost:3001/api/getFavorites',
            {
                method: 'GET'
            }
        )
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setFavGyms(data);
            setShowSpinner(false)
        })
    }, [])

    return (
        <> <Box><h1>Favorite Gyms</h1></Box>
        {showSpinner ? <CircularProgress /> :
            <Grid container spacing={2} justifyContent="center">
                {favGyms?.map((gym, index) => {
                    return <GymCard name={gym.displayName.text} location={gym.formattedAddress} />
                })}
            </Grid>}</>
    )
} 