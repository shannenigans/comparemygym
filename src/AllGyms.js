import React from 'react';
import GymCard from "./GymCard";

export default function AllGyms() {
    const [ gyms, setGyms ] = React.useState([]);

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

    return (gyms.forEach((gym) => {
        console.log(gym.name)
        return (
            <GymCard name={gym.name} location={gym.location}/>
        )} )
    )
    
}