import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import ActionCard2 from '../../views/cards/ActionCard2';

function Dialog7Expand(props) {
  const { onClose, open7, sendMessage } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open7}>
      <DialogTitle>농장 확장</DialogTitle>
      <Box
        mx={2}
        my={2}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        {[1, 2, 3, 4].map(index => (
          <ActionCard2 key={index} cardNumber={7} index={index} sendMessage={sendMessage} />
        ))}
      </Box>
    </Dialog>
  );
}

Dialog7Expand.propTypes = {
  onClose: PropTypes.func.isRequired,
  open7: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default Dialog7Expand;
