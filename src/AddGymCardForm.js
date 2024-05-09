import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormControl, FormControlLabel, FormGroup } from '@mui/material';

export default function AddGymCardForm() {
    const [ name, setName ] = React.useState('');
    const [ location, setLocation ] = React.useState('');

    return (
        <Box component="form" action='http://localhost:3001/addGym' method='POST' onSubmit={(form) => onSubmit(form)}>
            <Stack>
                <h1>Add a gym</h1>
                <FormControl>
                    <TextField id="gym-name" label="Name of Gym" margin="normal" name="name" onChange={(event) => setName(event.target.value)}></TextField>
                    <TextField id="gym-location" label="Location" margin="normal" name="location" onChange={(event) => setLocation(event.target.value)}></TextField>
                </FormControl>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <Grid container columns={1} spacing={2} alignItems={'center'}>
                        <Grid item xs={6}> <h1>Hours of Operation</h1></Grid>
                        <Grid item xs={6} >
                            <TimePicker label="Sunday Open" />
                            <TimePicker label="Sunday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Monday Open" />
                            <TimePicker label="Monday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Tuesday Open" />
                            <TimePicker label="Tuesday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Wednesday Open" />
                            <TimePicker label="Wednesday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Thursday Open" />
                            <TimePicker label="Thursday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Friday Open" />
                            <TimePicker label="Friday Close" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker label="Saturday Open" />
                            <TimePicker label="Saturday Close" />
                        </Grid>
                    </Grid>
                </DemoContainer>
            </LocalizationProvider>
            <Button type="submit">Add</Button>
        </Box>

    )
}

function onSubmit(form) {
    console.log('hi')
    form.preventDefault();
    
    console.log(form)
}