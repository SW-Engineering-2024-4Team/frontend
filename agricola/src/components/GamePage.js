import React from 'react';

// MUI 불러오기
import Grid from '@mui/material/Grid'

// 보드판 불러오기
import ProfileBoard from '../views/boards/ProfileBoard'
import ActionBoard from '../views/boards/ActionBoard'
import RoundBoard from '../views/boards/RoundBoard'
import CurrentBoard from '../views/boards/CurrentBoard'
import ResourceBoard from '../views/boards/ResourceBoard'
import PersonalBoard from '../views/boards/PersonalBoard'
import OwnBoard from '../views/boards/OwnBoard'
import TrigerBoard from '../views/boards/TrigerBoard'

// 팝업 버튼 불러오기
import MajorPopUp from '../components/buttons/MajorPopUp'
import SettingPopUp from '../components/buttons/SettingPopUp'

const GamePage = () => {
  const cardCount = 6;
  const row = 3;

  return (
    <div>
      <Grid container spacing = {3}>
        <CurrentBoard />  
        <MajorPopUp />
        <SettingPopUp />
      </Grid>

      <Grid container spacing = {3}>
        <ProfileBoard />
        <ActionBoard />
        <RoundBoard cardCount={cardCount} row={row} />
      </Grid>

      <Grid container spacing = {3}>
        <ResourceBoard />
        <PersonalBoard />
        <Grid item xs >
          <OwnBoard />
          <TrigerBoard />
        </Grid>
      </Grid>
    </div>
  );
};

export default GamePage;
