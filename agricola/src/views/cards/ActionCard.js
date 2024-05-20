import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

/*
행동 카드 파라미터
-- number 카드 고유 번호
-- index 카드 순서
-- playerNumber 클릭한 플레이어 번호
-- onClick 카드 클릭 여부
*/

const ActionCard = ({ number, index, playerNumber, isFlipped, onClick }) => {

  // const [clicked, setClicked] = useState(false);

  // const handleClick = () => {
  //   if (!clicked && typeof onClick === 'function') { // 클릭되지 않았을 때만 처리
  //     onClick(index, number);
  //     setClicked(true); // 클릭 시 clicked 상태를 true로 변경
  //   }
  // };

  // 추가: 카드가 뒤집힌 상태를 관리하기 위한 상태 추가
  const [isBack, setIsBack] = useState(false);

  // 카드 클릭 시 호출되는 핸들러 함수 
  const handleClick = () => {
    if (isBack == false){
      setIsBack(true);
      isFlipped == true;
      setTimeout(() => {
        if (typeof onClick === 'function') {
          onClick(index, number);
        }
      }, 500); // 0.5초 후에 onClick 실행
    }
  };

  // 카드의 클래스 결정
  // const cardClass = `card ${isBack ? 'front' : 'back' }`;
  
  const cardClass = `action ${number} ${isBack ? 'Y' : 'N'} `;
  const imagePath = `../../image/ActionCard/action${number}.png`;
  const coverImagePath = `../../image/ClickedCard/clicked-action${playerNumber+1}.png`;
  const opacity_ = isBack ? 1.0 : 0.0;
  
  return (
    <Card sx={{ maxWidth: 130 }}>
      <CardActionArea onClick={handleClick}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={imagePath} // 기본 이미지만 표시
            alt={cardClass}
            onClick={handleClick}
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
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ActionCard;
