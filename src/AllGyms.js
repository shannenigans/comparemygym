import React from 'react';
import GymCard from "./GymCard";

export default function AllGyms() {
    const [gyms, setGyms] = React.useState([]);

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
        <div>
            {gyms.map((gym, index) => {
                return <GymCard {...gym} />
            })}
        </div>
    )
}