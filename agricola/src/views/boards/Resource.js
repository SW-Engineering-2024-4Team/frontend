import React from "react";

// MUI 불러오기
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";

const Resource = ({ name, count }) => {
  const imgPath = `../image/Resource/${name}.png`;

  return (
    <div className="resource">
      <img src={imgPath} alt={name} />
      <span className="count">{count}</span>
    </div>
  );
};
export default Resource;
