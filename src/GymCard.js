import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';

export default function GymCard({ name, location, img }) {
    const [ averageRating, setAverageRating ] = React.useState([]);
    const [ numRatings, setNumRatings ] = React.useState(0);

    React.useEffect(() => {
        const queryParam = { name: name };
        const queryString = new URLSearchParams(queryParam).toString();

        fetch(`http://localhost:3001/api/getAverageRating?${queryString}`, {
            method: 'GET'
        })
        .then((res) => {
            return res.json()
        })
        .then((ratingsData) => {
            const sum = ratingsData.reduce((a, b) => a + b, 0);
            setAverageRating(sum / ratingsData.length);
            setNumRatings(ratingsData.length);
        })
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar aria-label="avatar name">
                            {name[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body1">
                        {location}
                    </Typography>
                    <Rating 
                    name="rating"
                    value={averageRating}
                    readOnly
                    />
                    <Box sx={{ ml: 2 }}>{numRatings} { numRatings === 1 ? 'review' : 'reviews'}</Box>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}