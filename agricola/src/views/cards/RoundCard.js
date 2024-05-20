import React, { useState } from 'react';

// MUI 라이브러리에서 필요한 컴포넌트들을 가져옵니다.
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// MUI에서 스타일링된 컴포넌트를 만듭니다.
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 130,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const getTooltipContent = (number) => {
  switch (number) {
    case 1:
      return (
        <React.Fragment>
          <Typography color="inherit">카드 1</Typography>
          <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
          {"It's very engaging. Right?"}
        </React.Fragment>
      );
    case 2:
      return (
        <React.Fragment>
          <Typography color="inherit">카드 2</Typography>
          <em>{"And here's"}</em> <b>{'some'}</b> <u>{'awesome content'}</u>.{' '}
          {"It's very intriguing. Right?"}
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <Typography color="inherit">기본 카드</Typography>
          <em>{"And here's"}</em> <b>{'some'}</b> <u>{'default content'}</u>.{' '}
          {"It's very interesting. Right?"}
        </React.Fragment>
      );
  }
};

// RoundCard 컴포넌트 정의
const RoundCard = ({ number, index, playerNumber, isFlipped, onClick }) => {

  // 카드가 뒤집힌 상태를 관리하기 위한 상태 추가
  const [isBack, setIsBack] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
    if (isBack == true){
      setIsClicked(true);
      setTimeout(() => {
        if (typeof onClick === 'function') {
          onClick(index, number);
        }
      }, 500); // 0.5초 후에 onClick 실행
    }
  };

  // 카드의 클래스 결정
  const cardClass = `card ${isBack ? 'front' : 'back' }`;
  // 이미지 경로 결정
  const imagePath = isBack ? `../../image/RoundCard/round${number}.png` : `../../image/CardFrame/frame1.png`;
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
    <HtmlTooltip title={getTooltipContent(number)}>
      <Card sx={{
          maxWidth: 130,
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s',
        }}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
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
    </HtmlTooltip>
  );
};

export default RoundCard; // RoundCard 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.

