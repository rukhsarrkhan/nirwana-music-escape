import React, {useEffect} from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SHOP_DATA from './shop_data';
import SongCategory from '../../components/song-category/SongCategory';
import {fetchSongsAPICall} from '../../redux/generic/action'
import { connect } from 'react-redux'

const Homepage = ({ fetchSongsAPICall, songs }) => {
    console.log(songs)
    useEffect(() => {
        fetchSongsAPICall()
        }, [])
  return (
    <div style={{display:'grid', gridGap:'20px'}}>
        {        
            Object.keys(songs).map(song=><SongCategory key={song}
            title={song}
            songs={songs[song]}/>)
        }
    </div>
    
  )
}

const mapStateToProps = state => {
    // console.log(state)
    return {
      userData: state.user,
      songs: state.songs
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchSongsAPICall:(obj)=>dispatch(fetchSongsAPICall(obj))
  
    }
  }
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Homepage)