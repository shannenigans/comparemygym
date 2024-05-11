import React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

export default function GiveFeedbackForm() {
    const [gyms, setGyms] = React.useState([]);
    const [feedback, setFeedback] = React.useState('');
    const [selectedGym, setSelectedGym] = React.useState('');

    const onSubmit = () => {
        const feedbackData = {
            gym: selectedGym,
            feedback: feedback
        }

        fetch()
    }

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
        <Box component="form" onSubmit={onSubmit}>
            <h1>Provide some feedback</h1>
            <FormControl>
                <InputLabel id="select-label">Gym Name</InputLabel>
                <Select labelId="select-label" value={selectedGym} onChange={(event) => {setSelectedGym(event.target.value)}} label="Gym Name">
                    {gyms.map((gymData) => {
                        return <MenuItem value={gymData.name}>{gymData.name}</MenuItem>
                    })}
                </Select>
                <TextField id="feedback" variant="outlined" label="Feedback" onChange={(event) => setFeedback(event.target.value)}/>
            </FormControl>
        </Box>
    )
}