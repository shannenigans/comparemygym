import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import CheckIcon from '@mui/icons-material/Check'

export default function GiveFeedbackForm() {
    const [gyms, setGyms] = React.useState([]);
    const [rating, setRating] = React.useState(0);
    const [selectedGym, setSelectedGym] = React.useState('');
    const [hover, setHover] =  React.useState();
    const [showAlert, setShowAlert] = React.useState(false);

    const labels = {
        0.5: 'Poor',
        1: 'Poor+',
        1.5: 'NeedsImprovement',
        2: 'NeedsImprovement+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };

    const onSubmit = (event) => {
        event.preventDefault();
        
        const ratingData = {
            rating: rating
        };

        const queryParam = {
            name: selectedGym
        };
        const queryString = new URLSearchParams(queryParam).toString();

        fetch(`http://localhost:3001/api/addFeedback?${queryString}`, {
            method: 'POST',
            body: JSON.stringify(ratingData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                console.log('feedback submit');
                setShowAlert(true)
            }
        })
    }

    React.useEffect(() => {
        setTimeout(() => {
            if (showAlert) {
                setShowAlert(false);
            }
        }, 2000)
    }, [ showAlert ]);

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
                <InputLabel id="select-label">Select a gym</InputLabel>
                <Select labelId="select-label" value={selectedGym} onChange={(event) => {setSelectedGym(event.target.value)}} label="Select a gym">
                    {gyms.map((gymData) => {
                        return <MenuItem value={gymData.name}>{gymData.name}</MenuItem>
                    })}
                </Select>
                <Rating 
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover)
                    }}
                    />
                    {rating !== null && (
                         <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                    )}
            </FormControl>
            {showAlert && <Alert icon={<CheckIcon />} severity='success'>Thanks for your feedback</Alert>}
            <Button type="submit">Submit</Button>
        </Box>
    )
}