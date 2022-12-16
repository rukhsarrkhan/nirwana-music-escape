import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
const   SongCard = ({item}) => {
  const {id, name, price, imageUrl} = item;
  return (
    <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body2">
                {price}
                <br />
                {id}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Learn More</Button>
    </CardActions>
</Card>
  )
}

export default SongCard