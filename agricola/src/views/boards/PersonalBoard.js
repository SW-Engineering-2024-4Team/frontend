import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// Styled component for each farm plot
const FarmPlot = styled(Box)(({ theme, status }) => ({
  width: '200px',
  height: '100px',
  backgroundColor: status.type === 'room' ? 'tan' : 'lightgreen',
  border: status.type === 'fence' ? '3px solid black' : '1px solid',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImageStyled = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const PersonalBoard = () => {
  const theme = useTheme();
  const [plotStatuses, setPlotStatuses] = useState(Array(9).fill({ type: 'none', level: 0 }));
  const [open, setOpen] = useState(false);
  const [currentPlot, setCurrentPlot] = useState(null);

  const handleClickOpen = (index) => {
    setCurrentPlot(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifyPlot = (modification) => {
    const newPlotStatuses = [...plotStatuses];
    const currentStatus = newPlotStatuses[currentPlot];

    if (currentStatus.type === 'none' || (currentStatus.type === 'room' && currentStatus.level < 3)) {
      switch (modification) {
        case 'fence':
        case 'plow':
          newPlotStatuses[currentPlot] = { type: modification, level: 0 };
          break;
        case 'room':
          newPlotStatuses[currentPlot] = { type: 'room', level: 1 };
          break;
        case 'barn':
          newPlotStatuses[currentPlot] = { type: 'barn', level: 0 };
          break;
        default:
          break;
      }
    } else if (currentStatus.type === 'room' && currentStatus.level < 3) {
      newPlotStatuses[currentPlot].level += 1;
    }

    setPlotStatuses(newPlotStatuses);
    handleClose();
  };

  return (
    <Box
      height={400}
      width={900}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap={1}
      p={2}
      sx={{ border: '2px solid grey', m: 1 }}
    >
      {plotStatuses.map((status, index) => (
        <FarmPlot
          key={index}
          status={status}
          onClick={() => handleClickOpen(index)}
        >
          {status.type === 'room' && <Typography>{`Room Lv${status.level}`}</Typography>}
          {status.type === 'plow' && <ImageStyled src="../../image/Farm/plow.png" alt="Plowed Field" />}
          {status.type === 'barn' && <ImageStyled src="../../image/Farm/house.png" alt="Barn" />}
        </FarmPlot>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Modification</DialogTitle>
        <DialogContent>
          <Button onClick={() => modifyPlot('fence')}>Build Fence</Button>
          <Button onClick={() => modifyPlot('room')}>Build Room</Button>
          <Button onClick={() => modifyPlot('plow')}>Plow Field</Button>
          <Button onClick={() => modifyPlot('barn')}>Build Barn</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalBoard;
