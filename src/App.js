import React from 'react';

import './App.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddLocationIcon from '@mui/icons-material/AddLocation'
import FeedbackIcon from '@mui/icons-material/Feedback';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MenuIcon from '@mui/icons-material/Menu';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import AddGymCardForm from './forms/AddGymCardForm';
import AllGyms from './AllGyms';
import GiveFeedbackForm from './forms/GiveFeedbackForm';
import Home from './Home';

const TABS = {
  Home: 'Home',
  Gyms: "Gyms",
  GiveFeedback: "Give Feedback",
  AddGym: "Add Gym"
}

const actions = [
  { icon: <FitnessCenterIcon />, name: TABS.Gyms },
  { icon: <AddLocationIcon />, name: TABS.AddGym },
  { icon: <FeedbackIcon />, name: TABS.GiveFeedback},
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
      {nav === TABS.Home && <Home></Home>}
      {nav === TABS.AddGym && <AddGymCardForm></AddGymCardForm>}
      {nav === TABS.Gyms && <AllGyms></AllGyms>}
      {nav === TABS.GiveFeedback && <GiveFeedbackForm></GiveFeedbackForm>}
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

export default App;
