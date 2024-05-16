import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import './styles.scss';

export default function GymCard({ gymData, wasFavorited }) {
    const [isFavorited, setIsFavorited] = React.useState(wasFavorited);

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
        {renderActions(gymData, toggleCardInFavorites, isFavorited)}
    </>)
}

function renderCardContent(gymData, isFront) {
    const name = gymData.displayName.text;
    const location = gymData.formattedAddress;
    const currentOpeningHours = gymData.currentOpeningHours?.weekdayDescriptions;
    const rating = gymData.rating;
    const website = gymData.websiteUri;
    const userRatingCount = gymData.userRatingCount;
    const phone = gymData.nationalPhoneNumber;
    
    return (isFront ?
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body1">
                {location}
            </Typography>
            <Typography variant='body1'>
                {phone}
            </Typography>
            <Rating 
                name="gym-rating"
                value={rating}
                readOnly
                className='gym-rating'
            />
            <Typography variant='body2'>
                {userRatingCount} reviews
            </Typography>
        </CardContent>
        : <CardContent>
            {currentOpeningHours && <Typography gutterBottom variant="h5" component="div">
                {'Hours'}
            </Typography>}
            {currentOpeningHours ? currentOpeningHours.map((hour) => {
                return <Typography variant="body1">{hour}</Typography>
            }) 
            : 
            <>No hours available. See <Link variant="body2">{website}</Link> for more details.</>}
        </CardContent>

    )
}

function renderActions(gymData, toggleCardInFavorites, isFavorited) {
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => toggleCardInFavorites(gymData)}>
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