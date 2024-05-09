const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const gyms = [];

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello')
});

app.get('/getGyms', (req, res) => {
    res.json(gyms);
})

app.post('/addGym', (req, res) => {
    const gym = req.body;
    console.log(gym);
    
    gyms.push(gym)
})

app.listen(3001,  () => {
    console.log('server running')
})