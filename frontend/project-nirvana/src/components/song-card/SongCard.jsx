import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
const   SongCard = ({item}) => {

  const {artist, songName, genre, imageUrl} = item;
  return (
    <Card sx={{ width: 275 }}>
            <CardContent>
            <Typography variant="h5" component="div">
                {songName}
            </Typography>
            <Typography variant="body2">
                {genre}
                <br />
                {artist}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Learn More</Button>
    </CardActions>
</Card>
  )
}

export default SongCard