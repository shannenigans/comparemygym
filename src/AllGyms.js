import React from 'react';

import { Box, Grid, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import GymCard from "./GymCard";

// convert radiust to meters since API expects meters
const RADIUS = {
    MILE: 1600,
    TWO_MILE: 3200,
    THREE_MILE: 4800
}

const RADIUS_STRINGS = {
    MILE: '1 mile',
    TWO_MILE: '2 miles',
    THREE_MILE: '3 miles'
}

export default function AllGyms() {
    const [gyms, setGyms] = React.useState([]);
    const [radius, setRadius] = React.useState(RADIUS.MILE)

    React.useEffect(() => {
        const getPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }

        getPosition().then((position) => {
            const queryParam = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                radius: radius
            };
            const queryString = new URLSearchParams(queryParam).toString();
            
            fetch(`http://localhost:3001/api/getNearbyGyms?${queryString}`)
                .then((res) => {
                    return res.json();
                })
                .then(data => { setGyms(data.places) })
                .catch(err => { console.log(err) })
        })
    }, [ radius ])


    return (
        <> <Box><h1>All Gyms</h1></Box>
            <FormControl>
                <FormLabel id="gym_radius_label">What radius of gyms in your area do you want to see?</FormLabel>
                <RadioGroup
                    aria-labelledby="gym_radius_label"
                    defaultValue={RADIUS.MILE}
                    name="radius-radio-buttons"
                    onChange={(event) => { event.preventDefault(); setRadius(event.target.value)}}
                >
                    <FormControlLabel value={RADIUS.MILE}  control={<Radio />} label={RADIUS_STRINGS.MILE} />
                    <FormControlLabel value={RADIUS.TWO_MILE} control={<Radio />} label={RADIUS_STRINGS.TWO_MILE}  />
                    <FormControlLabel value={RADIUS.THREE_MILE}  control={<Radio />} label={RADIUS_STRINGS.THREE_MILE}  />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2} justifyContent="center">
                {gyms?.map((gym, index) => {
                    return <GymCard name={gym.displayName.text} location={gym.displayName.formattedAddress} />
                })}
            </Grid></>
    )
}