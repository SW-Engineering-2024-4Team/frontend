import ProfileCard from "../cards/ProfileCard";

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function ProfileBoard() {
  return (
    <Box
      height={420}
      width={150}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ mx: 2, my: 1 }}
    >
      <Grid item xs >
        <ProfileCard currentPlayer={1} name={'one'} profileImage={`../image/Profile/profile1.png`} profileNum={'0'} isFirstPlayer={true}/>
        <ProfileCard currentPlayer={2} name={'two'} profileImage={`../image/Profile/profile2.png`} profileNum={'1'} isFirstPlayer={false}/>
        <ProfileCard currentPlayer={3} name={'three'} profileImage={`../image/Profile/profile3.png`} profileNum={'2'} isFirstPlayer={false}/>
        <ProfileCard currentPlayer={4} name={'four'} profileImage={`../image/Profile/profile4.png`} profileNum={'3'} isFirstPlayer={false}/>
      </Grid>
    </Box>
  )
}