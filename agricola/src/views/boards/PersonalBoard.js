import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// FarmPlot 스타일 컴포넌트 정의
const FarmPlot = styled(Box)(({ theme, status }) => ({
  flex: "1 0 18%",
  height: "100px",
  backgroundColor:
    status.type === "room" ? "tan" : status.type === "plow" ? "brown" : "#33CC33",
  border: "1px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PersonalBoard = () => {
  const theme = useTheme();
  
  // 초기 상태 설정
  const initialPlotStatuses = Array(15).fill({ type: "none", level: 0 });
  initialPlotStatuses[5] = { type: "room", level: 1 };
  initialPlotStatuses[10] = { type: "room", level: 1 };

  const [plotStatuses, setPlotStatuses] = useState(initialPlotStatuses);
  const [open, setOpen] = useState(false);
  const [currentPlot, setCurrentPlot] = useState(null);

  // 다이얼로그 열기
  const handleClickOpen = (index) => {
    setCurrentPlot(index);
    setOpen(true);
  };

  // 다이얼로그 닫기
  const handleClose = () => {
    setOpen(false);
  };

  // 인접한 칸 확인
  const isAdjacent = (index, type) => {
    const adjacentIndices = [
      index % 5 !== 0 ? index - 1 : -1, // 왼쪽이 같은 행에 있는지 확인
      index % 5 !== 4 ? index + 1 : -1, // 오른쪽이 같은 행에 있는지 확인
      index - 5 >= 0 ? index - 5 : -1,  // 위쪽이 유효한 인덱스인지 확인
      index + 5 < plotStatuses.length ? index + 5 : -1, // 아래쪽이 유효한 인덱스인지 확인
    ];
    return adjacentIndices.some(
      (adjIndex) => adjIndex >= 0 && plotStatuses[adjIndex].type === type
    );
  };

  // 밭 상태 수정
  const modifyPlot = (modification) => {
    const newPlotStatuses = [...plotStatuses];
    const currentStatus = newPlotStatuses[currentPlot];

    if (modification === "plow") {
      const canPlow = plotStatuses.filter(plot => plot.type === "plow").length === 0 ||
        isAdjacent(currentPlot, "plow");

      if (currentStatus.type === "none" && canPlow) {
        newPlotStatuses[currentPlot] = { type: "plow", level: 0 };
      } else {
        handleClose();
        return;
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
          role="button"
          onClick={() => handleClickOpen(index)}
        >
          {status.type === "room" && <span>Room</span>}
          {status.type === "plow" && <span>Plowed</span>}
        </FarmPlot>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Modification</DialogTitle>
        <DialogContent>
          <Button onClick={() => modifyPlot("plow")}>Plow Field</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalBoard;
