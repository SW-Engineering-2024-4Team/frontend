import React, { useState } from 'react';

// MUI 불러오기
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Tooltip from '@mui/material/Tooltip';

import { roundCardDetails } from '../../components/details/RoundCardDeatails';

/*
라운드 카드 파라미터
-- index 카드 셔플 순서
-- cardNumber 카드 고유 번호
-- playerNumber 클릭한 플레이어 번호
-- onClick 카드 클릭 여부
*/

export default function RoundCard({ index, cardNumber, playerNumber, onClick }) {

  // 카드가 뒤집힌 상태
  const [isBack, setIsBack] = useState(false);
  // 카드가 클릭된 상태
  const [isClicked, setIsClicked] = useState(false);

  // 카드 클릭 시 호출되는 핸들러 함수 
  const handleClick = () => {
    if (isBack == false){
      setIsBack(true);
      setTimeout(() => {
        if (typeof onClick === 'function') {
          onClick(index, cardNumber);
        }
      }, 500); // 0.5초 후에 onClick 실행
    }
    if (isBack == true){
      setIsClicked(true);
      setTimeout(() => {
        if (typeof onClick === 'function') {
          onClick(index, cardNumber);
        }
      }, 500); // 0.5초 후에 onClick 실행
    }
  };

  // 카드의 클래스 결정
  const cardClass = `card ${isBack ? 'front' : 'back' }`;
  // 이미지 경로 결정
  const imagePath = isBack ? `../../image/RoundCard/round${cardNumber}.png` : `../../image/CardFrame/frame1.png`;
  const coverImagePath = `../../image/ClickedCard/clicked-round${playerNumber+1}.png`;
  const opacity_ = isClicked ? 1.0 : 0.0;

  const handleCardHover = (event) => {
    const card = event.currentTarget;
    card.style.transform = 'scale(1.1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = '1px 4px 15px -3px rgba(0, 0, 0, 0.5)';
  };
  
  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = 'none';
  };

  // 카드 컴포넌트 반환
  return (
    <div>
    <Tooltip title={roundCardDetails[cardNumber-1]}>
      <Card 
        sx={{
          maxWidth: 130,
          transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s',
        }}
        onMouseEnter={ isBack ? handleCardHover : null }
        onMouseLeave={ isBack ? handleCardLeave : null }
        >
        <CardActionArea onClick={handleClick}>
            <CardMedia
              component="img"
              height="200"
              image={imagePath}
              alt={cardClass}
              onClick={handleClick} // 카드 클릭 이벤트에 handleClick 함수 할당
            />
            <img
              src={coverImagePath}
              alt="coverImage"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: `${opacity_}`,
              }}
            />
        </CardActionArea>
      </Card>
    </Tooltip>
    </div>
  );
};

