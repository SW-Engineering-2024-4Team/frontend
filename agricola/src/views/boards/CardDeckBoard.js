
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import TriggerBoard from './TriggerBoard';
import OwnBoard from './OwnBoard';
import MajorBoard from './MajorBoard';

const CardDeckBoard = () => {
  const [ownList, setOwnList] = useState([
    { id: 1, type: 'minor', content: 'Minor Card 1' },
    { id: 2, type: 'work', content: 'Work Card 1' },
    { id: 3, type: 'minor', content: 'Minor Card 2' },
    { id: 4, type: 'work', content: 'Work Card 2' },
    { id: 5, type: 'minor', content: 'Minor Card 3' },
    { id: 6, type: 'work', content: 'Work Card 3' },
    // { id: 7, type: 'major', content: 'Major Card 1' },
    // { id: 8, type: 'major', content: 'Major Card 2' },
  ]);

  const [triggerList, setTriggerList] = useState([]);

  const [isMajorBoardOpen, setIsMajorBoardOpen] = useState(false);

  const handleOwnCardClick = (id) => {
    setOwnList((prevList) => prevList.filter((card) => card.id !== id));
    const clickedCard = ownList.find((card) => card.id === id);
    if (clickedCard) {
      setTriggerList((prevList) => [...prevList, clickedCard]);
    }
  };

  const handleMajorCardClick = (index, cardNumber) => {
    const newCard = { id: cardNumber, type: 'major', playerNumber: 1, index, content: `Major Card ${cardNumber}` };
    setTriggerList((prevList) => [...prevList, newCard]);
  };

  return (
    <Box
      alignItems="flex-start"
      justifyContent="flex-start"
      height={475}
      width={485}
    >
      <Modal
        open={isMajorBoardOpen}
        onClose={() => setIsMajorBoardOpen(false)}
        aria-labelledby="major-board-modal"
        aria-describedby="major-board-modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.paper"
          p={4}
        >
          <MajorBoard handleClick={handleMajorCardClick} />
        </Box>
      </Modal>
      <TriggerBoard
        triggerList={triggerList}
        setTriggerList={setTriggerList}
      />
      <OwnBoard
        ownList={ownList}
        setOwnList={setOwnList}
        handleClick={handleOwnCardClick}
      />
    </Box>
  );
};

export default CardDeckBoard;
