import React from 'react';

import './App.css';

import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import HomeIcon from '@mui/icons-material/Home';

import AllGyms from './AllGyms';
// import AddGymCardForm from './forms/AddGymCardForm';
// import GiveFeedbackForm from './forms/GiveFeedbackForm';
import Home from './Home';
import Favorites from './Favorites';

const TABS = {
  Home: 'Home',
  Gyms: "Gyms",
  GiveFeedback: "Give Feedback",
  AddGym: "Add Gym",
  Favorites: "Favorites"
}

const actions = [
  { icon: <HomeIcon />, name: TABS.Home},
  { icon: <FitnessCenterIcon />, name: TABS.Gyms },
  // { icon: <AddLocationIcon />, name: TABS.AddGym },
  // { icon: <FeedbackIcon />, name: TABS.GiveFeedback},
  { icon: <FavoriteIcon />, name: TABS.Favorites}
];

function App() {
  const [nav, setNav] = React.useState('Home');
  const handleItemClick = (tab) => {
    setNav(tab);
  }

  return (<>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      textAlign="center"
    >
      {renderTab(nav)}
      <SpeedDial
        ariaLabel='speed dial'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleItemClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  </>
  );
}

function renderTab(nav) {
  switch(nav) {
    case TABS.Gyms:
      return <AllGyms />;
    case TABS.Favorites:
      return <Favorites />;
    default:
    case TABS.Home:
      return <Home />;
  }
}

export default App;
