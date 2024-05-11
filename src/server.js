const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const gyms = [];

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())

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

app.listen(3001,  () => {
    console.log('server running')
})