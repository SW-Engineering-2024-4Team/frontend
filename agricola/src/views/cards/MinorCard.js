import React, { useState } from 'react';

// MUI 컴포넌트
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} followCursor />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 150,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

/*
보조 설비 카드 파라미터
-- number 카드 고유 번호
-- index 카드 순조
-- isTriger 카드 발동 여부
-- onClick 카드 클릭 여부
*/

const MinorCard = ({ number, index, isTriger, onClick }) => {
  // const handleClick = () => {
  //   onClick(index, number);
  // };
  
   // 카드가 뒤집힌 상태를 관리하기 위한 상태 추가
   const [isBack, setIsBack] = useState(false);
 
   // 카드 클릭 시 호출되는 핸들러 함수 
   const handleClick = () => {
     if (isBack == false){
       setIsBack(true);
       setTimeout(() => {
        if (typeof onClick === 'function') {
          onClick(index, number);
        }
      }, 500); // 0.5초 후에 onClick 실행
     }
   };

  const cardClass = `minor ${number} ${isBack ? 'Y' : 'N'} `
  const imagePath = isBack ? null :`../image/MinorCard/minor${number}.png`

  const handleCardHover = (event) => {
    const card = event.target.closest('.minor-card');
    card.style.transform = 'translateY(-10%) scale(1.1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = '1px 4px 15px -3px rgba(0, 0, 0, 0.5)';
    card.style.zIndex = '1';
    
  };

  const handleCardLeave = (event) => {
    const card = event.target.closest('.minor-card');
    card.style.transform = 'none';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = 'none';
    card.style.zIndex = '0';
  };

  return (
    <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">그릇 제작소</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
        <Card className="minor-card" 
          sx={{
            maxWidth: 130,
            // position: 'relative',
          }}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
          onClick={handleClick}
          >
          <CardActionArea>
            {imagePath && (
              <CardMedia
                component="img"
                height="200"
                image={imagePath}
                alt={cardClass}
              />
            )}
          </CardActionArea>
        </Card>
    </HtmlTooltip>
  );
};

export default MinorCard;