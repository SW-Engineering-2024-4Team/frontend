import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'

import CardMedia from '@mui/material/CardMedia'
import Dialog from '@mui/material/Dialog';
import MajorBoard from '@/views/boards/MajorBoard';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <MajorBoard />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const imagePath = '../../image/CardFrame/frame5.png'

  return (
    <div>
      <Card sx={{ width: 75, height: 75, mx:1, my: 0}} >
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            image={imagePath}
            onClick={handleClickOpen}
          />
        </CardActionArea>
      </Card>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}