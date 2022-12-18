import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import {fetchSongToPlayAPICall} from '../../redux/songs/songActions'
import { connect } from 'react-redux';
const   SongCard = ({item, fetchSongToPlayAPICall}) => {
  
  const {artist, songName, genre, imageUrl, _id} = item;
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
            <Button size="small" onClick={()=>fetchSongToPlayAPICall(_id)}>Play</Button>
    </CardActions>
</Card>
  )
}


const mapStateToProps = state => {
  return {
    playerSong : state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongToPlayAPICall:(obj)=>dispatch(fetchSongToPlayAPICall(obj))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongCard)