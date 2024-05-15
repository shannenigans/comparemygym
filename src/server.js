require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const gyms = [];
const fetch = require("node-fetch")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/api/getNearbyGyms', (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        const requestData = {
            includedTypes: ['gym'],
            maxResultCount: 5 * (radius/1600),
            locationRestriction: {
                circle: {
                    center: { latitude, longitude },
                    radius: radius
                }
            }
        };

        fetch(`https://places.googleapis.com/v1/places:searchNearby`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers:
            {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_PLACES_API,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos'
            }

        })
        .then((response) => { return response.json()})
        .then((data) => { return res.json(data)})
    } catch (err) {
        console.error("Error", err)
    }
})

app.get('/api/getGyms', (req, res) => {
    res.json(gyms);
})

app.get('/api/getAverageRating', (req, res) => {
    const { name } = req.query;
    const index = gyms.findIndex((gym) => gym.name === name);

    const ratings = gyms[index].ratings;
    return res.json(ratings);
})

app.post('/api/addFeedback', (req, res) => {
    const { name } = req.query;
    const payload = req.body;
    const index = gyms.findIndex((gym) => gym.name === name);

    const existingGymData = gyms[index];
    let ratings = gyms[index].ratings;

    if (ratings) {
        ratings.push(payload.rating);
    } else {
        ratings = [payload.rating]
    }


    gyms[index] = {
        ...existingGymData,
        ratings: ratings
    }
    return res.json()
})

app.post('/api/addGym', (req, res) => {
    const gym = req.body;
    gyms.push(gym)
    return res.json()
})

app.listen(3001, () => {
    console.log('server running')
})