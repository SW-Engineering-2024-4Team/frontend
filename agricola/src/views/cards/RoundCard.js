import React from "react";
import "./RoundCard.css";

const Card = ({ number, index, isBack, onClick }) => {
  const handleClick = () => {
    onClick(index, number);
  };

  const cardClass = `card ${isBack ? "back" : "front"} `;
  const imagePath = isBack
    ? `../../components/cardbg.jpg`
    : `../image/RoundCard/round${number}.png`;

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      data-number={number}
      data-index={index}
    >
      <div className="card-content">
        {isBack ? null : <img src={imagePath} alt={`Round ${number}`} />}
      </div>
    </div>
  );
};

export default Card;
