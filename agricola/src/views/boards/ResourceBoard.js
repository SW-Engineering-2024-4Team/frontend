import React from "react";

// MUI 불러오기
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";

// 보드 컴포넌트 불러오기
import Board from "../../components/Board";
import Box from "@mui/material/Box";

// 라운드 카드 불러오기
import RoundCard from "../cards/RoundCard";

import Resource from "./Resource";

import { useState } from "react";
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

  return (
    <Box
      height={400}
      width={420}
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{ border: "2px solid grey" }}
    >
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
