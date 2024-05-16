import React from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';

import GymCard from './GymCard';

export default function Favorites() {
    const [favGyms, setFavGyms] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(true);

    React.useEffect(() => {
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
    })

    return (
        <>
            {favGyms.length > 0 && <Box marginRight="16px"><h1>Favorite Gyms</h1></Box>}
            {showSpinner ? <CircularProgress /> :
                <Grid container spacing={2} justifyContent="center">
                    {favGyms.length > 0
                        ? favGyms.map((gym, index) => {
                            return <GymCard gymData={gym} wasFavorited={gym.isFavorited} />
                        })
                        : <Typography justifyContent="center"><FavoriteIcon fontSize='small' className='favorite-icon'/>Favorite some gyms to see here.</Typography>}

                </Grid>}</>
    )
} 