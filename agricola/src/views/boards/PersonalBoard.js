import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

//Farim Plot의 css입니다.
// Styled component for each farm plot
const FarmPlot = styled(Box)(({ theme, status }) => ({
  flex: "1 0 18%",
  height: "100px",
  backgroundColor: status.type === "room" ? "tan" : "#33CC33",
  border: status.type === "fence" ? "3px solid black" : "1px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImageStyled = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "containr",
});
const BarnImageStyled = styled("img")({
  width: "80%",
  height: "80%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  objectFit: "contain",
});
const SeedImageStyled = styled("img")({
  width: "155%",
  height: "155%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  objectFit: "contain",
});

const PersonalBoard = () => {
  const theme = useTheme();
  const initialPlotStatuses = Array(15).fill({ type: "none", level: 0 });
  initialPlotStatuses[5] = { type: "room", level: 1 };
  initialPlotStatuses[10] = { type: "room", level: 1 }; //아래 두칸은 기본적으로 방으로 설정

  const [plotStatuses, setPlotStatuses] = useState(initialPlotStatuses);
  const [open, setOpen] = useState(false);
  const [currentPlot, setCurrentPlot] = useState(null);

  const handleClickOpen = (index) => {
    setCurrentPlot(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const isAdjacentPlot = (index) => {
    const adjacentIndices = [index - 1, index + 1, index - 5, index + 5];
    return adjacentIndices.some(
      (adjIndex) =>
        adjIndex >= 0 &&
        adjIndex < plotStatuses.length &&
        plotStatuses[adjIndex].type === "plow"
    );
  }; //밭은 한번 일구고 나면, 그 다음 밭을 일굴때는 인접한 곳에서만 이어서 일굴수 있습니다.

  const modifyPlot = (modification) => {
    const newPlotStatuses = [...plotStatuses];
    const currentStatus = newPlotStatuses[currentPlot];

    if (
      modification === "upgrade" &&
      currentStatus.type === "room" &&
      currentStatus.level < 3
    ) {
      newPlotStatuses[currentPlot].level += 1;
    } else if (modification === "seeding" && currentStatus.type === "plow") {
      newPlotStatuses[currentPlot] = { type: "seeding", level: 0 };
    } else if (modification === "plow") {
      if (
        currentStatus.type === "none" &&
        (plotStatuses.filter((plot) => plot.type === "plow").length === 0 ||
          isAdjacentPlot(currentPlot))
      ) {
        newPlotStatuses[currentPlot] = { type: "plow", level: 0 };
      } else {
        handleClose();
        return;
      }
    } else {
      if (
        currentStatus.type !== "none" &&
        currentStatus.type !== "fence" &&
        currentStatus.type !== "barn"
      ) {
        handleClose();
        return;
      } // fence와 barn은 중첩이 가능하게 지어질 수 있습니다.

      if (
        currentStatus.type === "none" ||
        (currentStatus.type === "room" && currentStatus.level < 3)
      ) {
        switch (modification) {
          case "fence":
            newPlotStatuses[currentPlot] = { type: modification, level: 0 };
            break;
          case "room":
            newPlotStatuses[currentPlot] = { type: "room", level: 1 };
            break;
          case "barn":
            newPlotStatuses[currentPlot] = { type: "barn", level: 0 };
            break;
          default:
            break;
        }
      } else if (currentStatus.type === "room" && currentStatus.level < 3) {
        newPlotStatuses[currentPlot].level += 1;
      } else if (currentStatus.type === "fence" && modification === "barn") {
        newPlotStatuses[currentPlot] = { type: "barn", level: 0 };
      } else if (currentStatus.type === "barn" && modification === "fence") {
        newPlotStatuses[currentPlot] = { type: "fence", level: 0 };
      }
    }

    setPlotStatuses(newPlotStatuses);
    handleClose();
  };

  return (
    <Box
      height={400}
      width={700}
      my={4}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap={1}
      p={2}
      sx={{ border: "2px solid grey" }}
    >
      {plotStatuses.map((status, index) => (
        <FarmPlot
          key={index}
          status={status}
          onClick={() => handleClickOpen(index)}
        >
          {status.type === "room" && (
            <>
              {status.level === 1 && (
                <ImageStyled
                  src="../../image/Farm/wood_room.png"
                  alt="Wood Room"
                />
              )}
              {status.level === 2 && (
                <ImageStyled
                  src="../../image/Farm/soil_room.png"
                  alt="Soil Room"
                />
              )}
              {status.level === 3 && (
                <ImageStyled
                  src="../../image/Farm/rock_room.png"
                  alt="Rock Room"
                />
              )}
            </> //집은 나무집->흙집->돌집 순으로 개조가 가능합니다. 돌집으로 개조된 이후로는 개조가 불가합니다.
          )}
          {status.type === "plow" && (
            <ImageStyled src="../../image/Farm/plow.png" alt="Plowed Field" />
          )}
          {status.type === "barn" && (
            <BarnImageStyled src="../../image/Farm/house.png" alt="Barn" />
          )}
          {status.type === "seeding" && (
            <SeedImageStyled
              src="../../image/Farm/plow_grain3.png"
              alt="Seeded Field"
            />
          )}
        </FarmPlot>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Modification</DialogTitle>
        <DialogContent>
          <Button onClick={() => modifyPlot("fence")}>Build Fence</Button>
          <Button onClick={() => modifyPlot("room")}>Build Room</Button>
          <Button onClick={() => modifyPlot("plow")}>Plow Field</Button>
          <Button onClick={() => modifyPlot("barn")}>Build Barn</Button>
          <Button onClick={() => modifyPlot("upgrade")}>Upgrade Room</Button>
          <Button onClick={() => modifyPlot("seeding")}>Seeding</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalBoard;
