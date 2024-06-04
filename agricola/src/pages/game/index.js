import React from "react";
import { useRouter } from "next/router";
// MUI 불러오기
import Grid from "@mui/material/Grid";

// 보드판 불러오기
import PlayerBoard from "../../views/boards/ProfileBoard";
import RoundBoard from "../../views/boards/RoundBoard";
import CurrentBoard from "../../views/boards/CurrentBoard";
import MajorBoard from "../../views/boards/MajorBoard";
import ResourceBoard from "../../views/boards/ResourceBoard";
import PersonalBoard from "../../views/boards/PersonalBoard";
import OwnBoard from "../../views/boards/OwnBoard";
import TriggerBoard from "../../views/boards/TriggerBoard";

import LoginPage from "../../components/LoginPage";

export default function Home(props) {
  const router = useRouter();

  const handleJoinRoom = (room_, name_, option) => {
    switch (option) {
      case "join":
        router.push(`game/${room_}?name=${name_}`);
        break;
      case "tutorial":
        router.push("tutorial");
        break;
    }
  };

  const cardCount = 6;
  const row = 3;

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs>
            <div>
              <PlayerBoard />
              <PlayerBoard />
              <PlayerBoard />
              <PlayerBoard />
            </div>
          </Grid>
          <Grid item xs>
            <div>
              <RoundBoard cardCount={cardCount} row={row} />
            </div>
          </Grid>
          <Grid item xs>
            <div>
              <CurrentBoard />
            </div>
            <div>
              <MajorBoard />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <ResourceBoard />
          </Grid>
          <Grid item xs>
            <PersonalBoard />
          </Grid>
          <Grid item xs>
            <OwnBoard />
            <TriggerBoard />
          </Grid>
        </Grid>
      </div>
      <Grid container justifyContent="center" alignItems="center" my={20}>
        <LoginPage type="home" btnFunction={handleJoinRoom} />
      </Grid>
    </>
  );
}
