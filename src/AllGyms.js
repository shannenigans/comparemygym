import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

import GymCard from "./GymCard";

export default function AllGyms() {
    const [gyms, setGyms] = React.useState([]);

    React.useEffect(() => {
        const getPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }
    
        getPosition().then((position) => {
            const queryParam = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            const queryString = new URLSearchParams(queryParam).toString();
            fetch(`http://localhost:3001/api/getNearbyGyms?${queryString}`)
            .then((res) => {
                return res.json();
            })
            .then(data => { setGyms(data.places)})
            .catch(err => {console.log(err)})
        })
    }, [])
   
    return (
        gyms.length === 0 
            ? <Box><h1>No gyms yet! Add one using the form.</h1></Box> 
            : <> <Box><h1>All Gyms</h1></Box>
            <Grid container spacing={2} justifyContent="center">
                {gyms.map((gym, index) => {
                    return <GymCard name={gym.displayName.text} location={gym.displayName.formattedAddress}/>
                })}
            </Grid></>
    )
}