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

import './styles.scss';

export default function GymCard({ gymData, wasFavorited }) {
    const [isFavorited, setIsFavorited] = React.useState(wasFavorited);
    const [isFlipped, setIsFlipped] = React.useState(false);

    const toggleCardInFavorites = (gymData) => {
        const gym = {
            ...gymData,
            isFavorited: !isFavorited
        };

        fetch('http://localhost:3001/api/addToFavorites',
            {
                method: 'POST',
                body: JSON.stringify(gym),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => { setIsFavorited(!isFavorited); })
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined" className='flip'>
                <div className='flip-inner'>
                    <div className='front'>
                        {renderInner(gymData, toggleCardInFavorites, isFavorited, true)}
                    </div>
                    <div className='back'>
                        {renderInner(gymData, toggleCardInFavorites, isFavorited, false)}
                    </div>
                </div>
            </Card>
        </Grid>
    )
}

function renderInner(gymData, toggleCardInFavorites, isFavorited, isFront) {
    const name = gymData.displayName.text;
    const location = gymData.formattedAddress;

    return (<>
        {renderHeader(name)}
        {renderCardContent(gymData, isFront)}
        {renderActions(name, location, toggleCardInFavorites, isFavorited)}
    </>)
}

function renderCardContent(gymData, isFront) {
    const name = gymData.displayName.text;
    const location = gymData.formattedAddress;
    const currentOpeningHours = gymData.currentOpeningHours;
    const rating = gymData.rating;
    
    return (isFront ?
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body1">
                {location}
            </Typography>
            <Rating 
                name="gym-rating"
                value={rating}
                readOnly
            />
        </CardContent>
        : <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {'test'}
            </Typography>
            <Typography variant="body1">
                {location}
            </Typography>
        </CardContent>

    )
}

function renderActions(name, location, toggleCardInFavorites, isFavorited) {
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => toggleCardInFavorites(name, location)}>
                <FavoriteIcon sx={isFavorited ? { color: 'red' } : {}} />
            </IconButton>
        </CardActions>
    )
}
function renderHeader(name) {
    return (
        <CardHeader
            avatar={
                <Avatar aria-label="avatar name">
                    {name[0]}
                </Avatar>
            }
        />
    )
}