import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// 보드판 불러오기
import ProfileBoard from "../views/boards/ProfileBoard";
import ActionBoard from "../views/boards/ActionBoard";
import RoundBoard from "../views/boards/RoundBoard";
import CurrentBoard from "../views/boards/CurrentBoard";
import ResourceBoard from "../views/boards/ResourceBoard";
import PersonalBoard from "../views/boards/PersonalBoard";
import OwnBoard from "../views/boards/OwnBoard";
import TriggerBoard from "../views/boards/TriggerBoard";

// 팝업 버튼 불러오기
import MajorPopUp from "../components/buttons/MajorPopUp";
import SettingPopUp from "../components/buttons/SettingPopUp";
import ChatPopUp from "../components/buttons/ChatPopUp";

// 팝업 다이어로그 불러오기
import DialogChoiceCard from "./buttons/DialogChoiceCard";

// 컨텍스트 관련 불러오기
import { usePlayer } from "./PlayerContext";

function GamePage({ currentPlayer }) {
  const { clickedPlayer } = usePlayer();

  useEffect(() => {
    console.log("Clicked player:", clickedPlayer);
  }, [clickedPlayer]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Grid container spacing={1}>
        <CurrentBoard />
        <MajorPopUp currentPlayer={currentPlayer} />
        <SettingPopUp />
        <ChatPopUp currentPlayer={currentPlayer} />
      </Grid>

      <Grid container spacing={1}>
        <ProfileBoard clickedPlayer={clickedPlayer} />
        <ActionBoard currentPlayer={currentPlayer} />
        <RoundBoard currentPlayer={currentPlayer} />
      </Grid>

      <Grid container spacing={1}>
        <ResourceBoard clickedPlayer={clickedPlayer} />
        <PersonalBoard
          currentPlayer={currentPlayer}
          clickedPlayer={clickedPlayer}
        />
        <Grid item xs>
          <OwnBoard
            currentPlayer={currentPlayer}
            clickedPlayer={clickedPlayer}
          />
          <TriggerBoard
            currentPlayer={currentPlayer}
            clickedPlayer={clickedPlayer}
          />
        </Grid>
      </Grid>
      <button onClick={handleClick}>
        <DialogChoiceCard
          cardType={"round"}
          cardNumber={6}
          open={open}
          onClose={handleClose}
        />
      </button>
    </Grid>
  );
}

export default GamePage;
