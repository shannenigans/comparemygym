import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function AddGymCardForm() {
    return (
        <Box>
            <TextField id="gym-name" label="Name of Gym" margin="normal" fullWidth></TextField>
            <TextField id="gym-location" label="Location" margin="normal" fullWidth></TextField>
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

        </Box>
    )
}