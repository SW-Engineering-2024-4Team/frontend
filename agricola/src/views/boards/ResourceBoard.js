import React, { useState, useRef } from 'react';

// MUI 불러오기\
import { styled, useTheme } from "@mui/material/styles";

// 보드 컴포넌트 불러오기
import Box from "@mui/material/Box";

import Resource from "./Resource";
import WebSocketClient from '../../components/WebSocketClient'; // WebSocketClient 불러오기

const ResourceBoard = () => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "light" ? "triangle-light.png" : "triangle-dark.png";

  const [resources, setResources] = useState([
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
  ]);

  const handlePlacement = (name, placement) => {
    const updatedResources = resources.map((resource) => {
      if (resource.name === name) {
        return { ...resource, count: placement };
      }
      return resource;
    });
    setResources(updatedResources);
  };

  const sendMessageRef = useRef(null);

  // 보드 정보 백엔드에게 받아오기
  const handleMessageReceived = (message) => {
    console.log('Message received from server:', message);
    if (message.resources) {
      setResources(message.resources);
    }
  };

  return (
    <Box
      height={400}
      width={150}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{ border: "2px solid grey", m: 0 }}
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
            {resources.slice(index * 2, (index + 1) * 2).map((resource) => (
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
