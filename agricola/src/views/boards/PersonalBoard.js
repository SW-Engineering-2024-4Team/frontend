import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FarmPlot = styled(Box)(({ theme, status, canBuildFence, fences }) => ({
  flex: "1 0 18%",
  height: "100px",
  backgroundColor:
    status.type === "room" ? "tan" : canBuildFence ? "lightgreen" : "#33CC33",
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
}));

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
  const [canBuildFence, setCanBuildFence] = useState(Array(15).fill(false));
  const [canBuildRoom, setCanBuildRoom] = useState(Array(15).fill(false));
  const [fenceCount, setFenceCount] = useState(0);
  const [fences, setFences] = useState(
    Array(15).fill({ top: 0, right: 0, bottom: 0, left: 0 })
  );

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
  //인접한 곳에 있는지 확인합니다. 밭과 방, 울타리는 각각 인접한 곳에서만 추가로 이어 지을 수 있습니다.

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
      if (status.type === "fence") {
        newFences[index] = { top: 1, right: 1, bottom: 1, left: 1 };

        if (index - 5 >= 0 && newPlotStatuses[index - 5].type === "fence") {
          newFences[index].top = 0;
          newFences[index - 5].bottom = 0;
        }
        if (
          index + 5 < newPlotStatuses.length &&
          newPlotStatuses[index + 5].type === "fence"
        ) {
          newFences[index].bottom = 0;
          newFences[index + 5].top = 0;
        }
        if (index % 5 !== 0 && newPlotStatuses[index - 1].type === "fence") {
          newFences[index].left = 0;
          newFences[index - 1].right = 0;
        }
        if (index % 5 !== 4 && newPlotStatuses[index + 1].type === "fence") {
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
  }; // 울타리를 계산합니다. 울타리는 가장자리에만 지어져야합니다. 예를 들어 두칸인 경우 울타리 개수는 6, 3칸인 경우 8개가 됩니다.

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
        currentStatus.type === "none" &&
        (plotStatuses.filter((plot) => plot.type === "fence").length === 0 ||
          isAdjacent(currentPlot, "fence"))
      ) {
        newPlotStatuses[currentPlot] = { type: "fence", level: 0 };
      } else {
        handleClose();
        return;
      }
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
    calculateFenceCount(newPlotStatuses);
    updateCanBuildFence();
    updateCanBuildRoom();
    handleClose();
  };

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
            </> // 집은 나무집->흙집->돌집 순으로 개조가 가능합니다. 돌집으로 개조된 이후로는 개조가 불가합니다.
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
