import React from 'react';

import './App.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddLocationIcon from '@mui/icons-material/AddLocation'
import FeedbackIcon from '@mui/icons-material/Feedback';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import AddGymCardForm from './AddGymCardForm';
import AllGyms from './AllGyms';
import GiveFeedbackForm from './GiveFeedbackForm';

const TABS = {
  Gyms: "Gyms",
  GiveFeedback: "GiveFeedback",
  AddGym: "AddGym"
}

function App() {
  const [ nav, setNav ] = React.useState('Gyms');
  const handleChange = (event, newValue) => {
    setNav(newValue);
  }

  return (
    <div className="App">
      {nav == TABS.AddGym && <AddGymCardForm></AddGymCardForm>}
      {nav == TABS.Gyms && <AllGyms></AllGyms>}
      {nav == TABS.GiveFeedback && <GiveFeedbackForm></GiveFeedbackForm>}
      <BottomNavigation onChange={handleChange} value={nav}>
        <BottomNavigationAction label="Gyms" value={TABS.Gyms} icon={<FitnessCenterIcon />} />
        <BottomNavigationAction label="Add Gym" value={TABS.AddGym} icon={<AddLocationIcon />} />
        <BottomNavigationAction label="Give Feedback" value={TABS.GiveFeedback} icon={<FeedbackIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
