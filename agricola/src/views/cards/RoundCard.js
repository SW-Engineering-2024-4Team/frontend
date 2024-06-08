import React, { useState } from 'react';

// MUI 불러오기
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

/*
라운드 카드 파라미터
-- index 카드 셔플 순서
-- cardNumber 카드 고유 번호
-- playerNumber 클릭한 플레이어 번호
-- onClick 카드 클릭 여부
*/

export default function RoundCard({ cardNumber, playerNumber, onClick, sendMessage, isBack }) {

  // 카드가 클릭된 상태
  const [isClicked, setIsClicked] = useState(playerNumber !== 0);

  // 카드 클릭 시 호출되는 핸들러 함수 
  const handleClick = () => {
    if (isBack == true){
      if (!isClicked){
        setIsClicked(isClicked);
        setTimeout(() => {
          if (typeof onClick === 'function') {
            onClick(cardNumber);
          }
        }, 500); // 0.5초 후에 onClick 실행
      }
    }
    if (typeof sendMessage === 'function') {
      sendMessage(cardNumber);
    }
  };

  // 카드의 클래스 결정
  const cardClass = `card ${isBack ? 'front' : 'back' }`;
  // 이미지 경로 결정
  const cardClas2 = `round ${cardNumber} ${isClicked ? 'Y' : 'N'} `;
  const imagePath = isBack ? `../../image/RoundCard/round${cardNumber}.png` : `../../image/CardFrame/frame1.png`;
  const coverImagePath = playerNumber ? `../../image/ClickedCard/clicked-round${playerNumber}.png` : null;

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
      <Card 
        sx={{
          maxWidth: 130,
          transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s', borderRadius: '10px'
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
            />
            {isBack == 1 && isClicked && coverImagePath && (
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
                }}
              />
            )}
        </CardActionArea>
      </Card>
    </div>
  );
};

