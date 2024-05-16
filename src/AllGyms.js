import React from 'react';

import { Box, CircularProgress, Grid, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

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
    const [favGym, setFavGyms] = React.useState([])
    const [radius, setRadius] = React.useState(RADIUS.MILE);
    const [showSpinner, setShowSpinner] = React.useState(true);

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

            Promise.all([
                fetch(`http://localhost:3001/api/getNearbyGyms?${queryString}`)
                .then((res) => {
                    return res.json();
                }),
                fetch('http://localhost:3001/api/getFavorites',
                {
                    method: 'GET'
                }
            )
                .then((res) => {
                    return res.json()
                })
            ]).then(( data ) => {
                setShowSpinner(false)

                let gyms = data[0].places;
                const favGyms = data[1]
                
                if (favGyms.length !== 0) {
                    favGyms.forEach((favGym) => {
                        const gymToUpdate = gyms.find((gym) => gym.displayName.text === favGym.displayName.text);

                        if (gymToUpdate) {
                            gymToUpdate.isFavorited = true;
                        }
                    })
            
                    setGyms(gyms)
                } else {
                    setGyms(data[0].places);
                }
            })

        })
    }, [radius])


    return (
        <> <Box><h1>All Gyms</h1></Box>
            {renderRadioButtons(setRadius, setShowSpinner)}
            {showSpinner ? <CircularProgress /> :
                <Grid container spacing={2} justifyContent="center">
                    {gyms?.map((gym, index) => {
                        return <GymCard gymData={gym} wasFavorited={gym?.isFavorited} />
                    })}
                </Grid>}</>
    )
}

function renderRadioButtons(setRadius, setShowSpinner) {
    return (
        <FormControl>
                <FormLabel id="gym_radius_label">Find the top gyms in this radius:</FormLabel>
                <RadioGroup
                    aria-labelledby="gym_radius_label"
                    defaultValue={RADIUS.MILE}
                    name="radius-radio-buttons"
                    onChange={(event) => { event.preventDefault(); setRadius(event.target.value); setShowSpinner(true) }}
                >
                    <FormControlLabel value={RADIUS.MILE} control={<Radio />} label={RADIUS_STRINGS.MILE} />
                    <FormControlLabel value={RADIUS.TWO_MILE} control={<Radio />} label={RADIUS_STRINGS.TWO_MILE} />
                    <FormControlLabel value={RADIUS.THREE_MILE} control={<Radio />} label={RADIUS_STRINGS.THREE_MILE} />
                </RadioGroup>
            </FormControl>
    )
}