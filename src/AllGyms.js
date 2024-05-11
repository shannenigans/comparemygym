import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

import GymCard from "./GymCard";

export default function AllGyms() {
    const [gyms, setGyms] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/api/getGyms', {
            method: 'GET'
        })
            .then(res => {
                return res.json()
            })
            .then(gymData => {
                setGyms(gymData)
            })
    }, [])

    return (
        gyms.length === 0 
            ? <Box><h1>No gyms yet! Add one using the form.</h1></Box> 
            : <> <Box><h1>All Gyms</h1></Box>
            <Grid container spacing={2}>
                {gyms.map((gym, index) => {
                    return <GymCard {...gym} />
                })}
            </Grid></>
    )
}