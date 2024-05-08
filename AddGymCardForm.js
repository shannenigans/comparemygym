import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function AddGymCardForm() {
    return (
        <FormControl>
            <InputLabel htmlFor="gym-name">Name of Gym</InputLabel>
            <Input id="gym-name"></Input>
            <InputLabel htmlFor="gym-location">Location</InputLabel>
            <Input id="gym-location"></Input>
            <InputLabel htmlFor="gym-hours">Hours of operation</InputLabel>
            <Input id="gym-name"></Input>
        </FormControl>
    )
}