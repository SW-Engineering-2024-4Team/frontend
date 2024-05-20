import React from 'react';

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
주요 설비 카드 파라미터
-- number 카드 고유 번호
-- index 카드 순서
-- isTriger 카드 발동 여부
-- onClick 카드 클릭 여부
*/

const MajorCard = ({ number, index, isTriger, onClick }) => {

  const handleClick = () => {
    onClick(index, number);
  };
  
  const cardClass = `major ${number} ${isTriger ? 'Y' : 'N'} `
  const imagePath = `../../image/MajorCard/major${number}.png`

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
        <Card sx={{ maxWidth: 130 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="200"
                image={imagePath}
                alt={cardClass}
                onClick={handleClick}
                />
            </CardActionArea>
        </Card>
    </HtmlTooltip>
  );
};

export default MajorCard;