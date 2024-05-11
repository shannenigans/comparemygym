import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CheckIcon from '@mui/icons-material/Check';

import { FormControl } from '@mui/material';

export default function AddGymCardForm() {
    const [name, setName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        const gymData = {
            name: name,
            location: location,
            ratings: []
        };

        fetch('http://localhost:3001/api/addGym', {
            method: 'POST',
            body: JSON.stringify(gymData),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    console.log('ok!');
                    setName('')
                    setLocation('')
                    setShowAlert(true);
                }
            })



    }

    React.useEffect(() => {
        setTimeout(() => {
            if (showAlert) {
                setShowAlert(false);
            }
        }, 2000)
    }, [ showAlert ])

    return (
        <Box component="form" action='http://localhost:3001/addGym' method='POST' onSubmit={onSubmit}>
            <Box>
                <h1>Add a gym</h1>
                <FormControl>
                    <TextField id="gym-name" label="Name of Gym" margin="normal" name="name" value={name} onChange={(event) => { setName(event.target.value); }}></TextField>
                    <TextField id="gym-location" label="Location" margin="normal" name="location" value={location} onChange={(event) => setLocation(event.target.value)}></TextField>
                </FormControl>
                {showAlert && <Alert icon={<CheckIcon />} severity='success'>Successfully added gym.</Alert>}
            </Box>
            <Button type="submit">Add</Button>
        </Box>

    )
}

