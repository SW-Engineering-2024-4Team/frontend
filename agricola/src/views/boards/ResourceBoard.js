import React, { useState, useEffect, useRef } from 'react';
import Box from "@mui/material/Box";
import Resource from "./Resource";
import WebSocketClient from '../../components/WebSocketClient';

const initialResources = [
  { name: "Wood", count: 0 },
  { name: "Soil", count: 0 },
  { name: "Rock", count: 0 },
  { name: "Food", count: 0 },
  { name: "Sheep", count: 0 },
  { name: "Grain", count: 0 },
  { name: "Adult", count: 0 },
  { name: "Newborn", count: 0 },
  { name: "Fence", count: 0 },
  { name: "Barn", count: 0 },
];

const ResourceBoard = ({ clickedPlayer }) => {
  const [resources1, setResources1] = useState(initialResources);
  const [resources2, setResources2] = useState(initialResources);
  const [resources3, setResources3] = useState(initialResources);
  const [resources4, setResources4] = useState(initialResources);

  const [resources, setResources] = useState(initialResources);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (clickedPlayer === 1) {
      setColor('rgba(0, 255, 0, 0.3)');
      setResources(resources1);
    } else if (clickedPlayer === 2) {
      setColor('rgba(255, 0, 0, 0.3)');
      setResources(resources2);
    } else if (clickedPlayer === 3) {
      setColor('rgba(0, 0, 255, 0.3)');
      setResources(resources3);
    } else if (clickedPlayer === 4) {
      setColor('rgba(255, 255, 0, 0.3)');
      setResources(resources4);
    }
  }, [clickedPlayer, resources1, resources2, resources3, resources4]);

  const handleMessageReceived = (message) => {
    console.log('Message received from server:', message);
    if (Array.isArray(message.resources)) {
      if (message.playerId === 1) setResources1(message.resources);
      if (message.playerId === 2) setResources2(message.resources);
      if (message.playerId === 3) setResources3(message.resources);
      if (message.playerId === 4) setResources4(message.resources);
    } else {
      console.error('Invalid resources format received from server');
    }
  };

  return (
    <Box
      height={400}
      width={150}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={color}
      gap={2}
      p={2}
      sx={{ 
        mx: 3,
        my: 1,
        borderRadius: 2,
      }}
    >
      <WebSocketClient
        roomId="1"
        onMessageReceived={handleMessageReceived}
      />
      <div className="resource-board">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {(Array.isArray(resources) ? resources : []).slice(index * 2, (index + 1) * 2).map((resource) => (
              <Resource
                key={resource.name}
                name={resource.name}
                count={resource.count}
              />
            ))}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ResourceBoard;
