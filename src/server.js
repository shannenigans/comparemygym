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

app.post('/api/addGym', (req, res) => {
    const gym = req.body;
    gyms.push(gym)
    return res.json()
})

app.listen(3001,  () => {
    console.log('server running')
})