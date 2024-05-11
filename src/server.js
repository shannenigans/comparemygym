const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const gyms = [];

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.get('/api/getGyms', (req, res) => {
    res.json(gyms);
})

app.post('/api/addFeedback', (req, res) => {
    const payload = req.body;
    const index = gyms.findIndex((gym) => gym.name === payload.gym);

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

app.listen(3001,  () => {
    console.log('server running')
})