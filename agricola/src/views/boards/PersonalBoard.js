import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FarmPlot = styled(Box)(
  ({ theme, status, canBuildFence, fences, selected }) => ({
    flex: "1 0 18%",
    height: "100px",
    backgroundColor: selected
      ? "yellow"
      : status.type === "room"
      ? "tan"
      : canBuildFence
      ? "lightgreen"
      : "#33CC33",
    border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    ...(fences.top && {
      borderTop: "3px solid red",
    }),
    ...(fences.right && {
      borderRight: "3px solid red",
    }),
    ...(fences.bottom && {
      borderBottom: "3px solid red",
    }),
    ...(fences.left && {
      borderLeft: "3px solid red",
    }),
  })
);

const ImageStyled = styled("img")({
  width: "100%",
  height: "100%",
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
const FenceImageStyled = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
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
  initialPlotStatuses[10] = { type: "room", level: 1 };

  const [plotStatuses, setPlotStatuses] = useState(initialPlotStatuses);
  const [open, setOpen] = useState(false);
  const [currentPlot, setCurrentPlot] = useState(null);
  const [canBuildFence, setCanBuildFence] = useState(Array(15).fill(false));
  const [canBuildRoom, setCanBuildRoom] = useState(Array(15).fill(false));
  const [fenceCount, setFenceCount] = useState(0);
  const [fences, setFences] = useState(
    Array(15).fill({ top: 0, right: 0, bottom: 0, left: 0 })
  );
  const [actionType, setActionType] = useState(null);
  const [validPositions, setValidPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handleClickOpen = (index) => {
    setCurrentPlot(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isAdjacent = (index, type) => {
    const adjacentIndices = [
      index % 5 !== 0 ? index - 1 : -1, // 왼쪽이 같은 행에 있는지 확인
      index % 5 !== 4 ? index + 1 : -1, // 오른쪽이 같은 행에 있는지 확인
      index - 5 >= 0 ? index - 5 : -1, // 위쪽이 유효한 인덱스인지 확인
      index + 5 < plotStatuses.length ? index + 5 : -1, // 아래쪽이 유효한 인덱스인지 확인
    ];
    return adjacentIndices.some(
      (adjIndex) => adjIndex >= 0 && plotStatuses[adjIndex].type === type
    );
  };

  const updateCanBuildFence = () => {
    const newCanBuildFence = plotStatuses.map((status, index) => {
      if (
        status.type === "none" &&
        (plotStatuses.filter((plot) => plot.type === "fence").length === 0 ||
          isAdjacent(index, "fence"))
      ) {
        return true;
      }
      return false;
    });
    setCanBuildFence(newCanBuildFence);
  };

  const updateCanBuildRoom = () => {
    const newCanBuildRoom = plotStatuses.map((status, index) => {
      if (status.type === "none" && isAdjacent(index, "room")) {
        return true;
      }
      return false;
    });
    setCanBuildRoom(newCanBuildRoom);
  };

  const calculateFenceCount = (newPlotStatuses) => {
    let count = 0;
    const newFences = Array(newPlotStatuses.length).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });

    newPlotStatuses.forEach((status, index) => {
      if (status.fence) {
        newFences[index] = { top: 1, right: 1, bottom: 1, left: 1 };

        if (index - 5 >= 0 && newPlotStatuses[index - 5].fence) {
          newFences[index].top = 0;
          newFences[index - 5].bottom = 0;
        }
        if (
          index + 5 < newPlotStatuses.length &&
          newPlotStatuses[index + 5].fence
        ) {
          newFences[index].bottom = 0;
          newFences[index + 5].top = 0;
        }
        if (index % 5 !== 0 && newPlotStatuses[index - 1].fence) {
          newFences[index].left = 0;
          newFences[index - 1].right = 0;
        }
        if (index % 5 !== 4 && newPlotStatuses[index + 1].fence) {
          newFences[index].right = 0;
          newFences[index + 1].left = 0;
        }
      }
    });

    newFences.forEach((fence) => {
      count += fence.top + fence.right + fence.bottom + fence.left;
    });

    setFenceCount(count);
    setFences(newFences);
    console.log(`현재 울타리 개수: ${count}`);
  };

  const modifyPlot = (modification, x, y) => {
    const newPlotStatuses = [...plotStatuses];
    const currentPlot = x * 5 + y;
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
        (plotStatuses.filter(
          (plot) => plot.type === "plow" || plot.type === "seeding"
        ).length === 0 ||
          isAdjacent(currentPlot, "plow") ||
          isAdjacent(currentPlot, "seeding"))
      ) {
        newPlotStatuses[currentPlot] = { type: "plow", level: 0 };
      } else {
        handleClose();
        return;
      }
    } else if (modification === "fence") {
      if (
        (currentStatus.type === "none" &&
          (plotStatuses.filter((plot) => plot.type === "fence").length === 0 ||
            isAdjacent(currentPlot, "fence"))) ||
        currentStatus.type === "barn"
      ) {
        newPlotStatuses[currentPlot] = {
          ...currentStatus,
          fence: true,
          type: currentStatus.type === "none" ? "fence" : currentStatus.type,
        };
      } else if (currentStatus.type === "fence") {
        handleClose();
        return;
      }
    } else if (modification === "barn") {
      newPlotStatuses[currentPlot] = { ...currentStatus, barn: true };
    } else if (modification === "room") {
      if (currentStatus.type === "none" && isAdjacent(currentPlot, "room")) {
        newPlotStatuses[currentPlot] = { type: "room", level: 1 };
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
      }

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
    calculateFenceCount(newPlotStatuses);
    updateCanBuildFence();
    updateCanBuildRoom();
    handleClose();
  };

  const handlePlotClick = (index) => {
    const x = Math.floor(index / 5); // 세로 좌표
    const y = index % 5; // 가로 좌표

    // 유효한 좌표인지 확인
    const isValidPosition = validPositions.some(
      (pos) => pos.x === x && pos.y === y
    );
    if (!isValidPosition) {
      console.log("Invalid position selected:", x, y);
      return;
    }

    if (actionType === "fence") {
      // 울타리 클릭 처리
      const newSelectedPositions = [...selectedPositions];
      const positionExists = newSelectedPositions.some(
        (pos) => pos.x === x && pos.y === y
      );
      if (positionExists) {
        setSelectedPositions(
          newSelectedPositions.filter((pos) => pos.x !== x || pos.y !== y)
        );
      } else {
        newSelectedPositions.push({ x, y });
        setSelectedPositions(newSelectedPositions);
      }
    } else {
      // 기존 로직 유지 및 수정
      if (actionType === "plow") {
        modifyPlot("plow", x, y);
      } else if (actionType === "room") {
        modifyPlot("room", x, y);
      } else if (actionType === "barn") {
        modifyPlot("barn", x, y);
      }

      // 좌표가 유효한지 확인하고 유효하면 백엔드로 전송
      const payload = {
        playerId: 1,
        x,
        y,
      };
      console.log("Valid position selected:", x, y);
      handleSendPosition(payload); // handleSendPosition을 통해 좌표 전송
    }
  };

  const handleSendFencePositions = () => {
    const payload = {
      playerId: 1,
      positions: selectedPositions,
    };
    console.log("Sending fence positions:", selectedPositions);
    handleSendPosition(payload);
    setSelectedPositions([]);
  };

  const handleValidPositions = (validPositionsMessage) => {
    const { playerId, actionType, validPositions } = validPositionsMessage;

    console.log("handleValidPositions called with:", validPositionsMessage);
    setActionType(actionType);
    setValidPositions(validPositions);
    console.log("Valid positions updated:", validPositions);
  };

  useEffect(() => {
    const initialMessage = {
      validPositions: [
        { x: 2, y: 3 },
        { x: 0, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 4 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 3 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 4 },
      ],
      playerId: "1",
      actionType: "fence",
    };
    handleValidPositions(initialMessage);
  }, []);

  useEffect(() => {
    updateCanBuildFence();
    updateCanBuildRoom();
  }, [plotStatuses]);

  useEffect(() => {
    console.log(`현재 울타리 개수: ${fenceCount}`);
  }, [fenceCount]);

  return (
    <Box
      height={400}
      width={700}
      my={4}
      mx={2}
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
          canBuildFence={canBuildFence[index]}
          canBuildRoom={canBuildRoom[index]}
          fences={fences[index]}
          selected={selectedPositions.some(
            (pos) => pos.x === Math.floor(index / 5) && pos.y === index % 5
          )}
          onClick={() => handlePlotClick(index)}
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
            </>
          )}
          {status.type === "plow" && (
            <ImageStyled src="../../image/Farm/plow.png" alt="Plowed Field" />
          )}
          {status.barn && (
            <BarnImageStyled src="../../image/Farm/house.png" alt="Barn" />
          )}
          {status.fence && <FenceImageStyled />}
          {status.type === "seeding" && (
            <SeedImageStyled
              src="../../image/Farm/plow_grain3.png"
              alt="Seeded Field"
            />
          )}
        </FarmPlot>
      ))}
      {actionType === "fence" && selectedPositions.length > 0 && (
        <Button onClick={handleSendFencePositions}>Fence!!</Button>
      )}
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
