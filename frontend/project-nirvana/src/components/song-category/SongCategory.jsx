import React from 'react'
import { connect } from 'react-redux'
import SongCard from '../song-card/SongCard'
import './SongCategory.css'

const SongCategory = (props) => {
    //console.log('here')
//  console.log(props)
 //console.log(items)
  return (
    <div className='category-viewer'>
        <h1 className="title">{props.title}</h1>
        <div className='category-list'>
        {  
               props.songs.filter((song, idx)=>idx<4).map((song)=>(
                    <SongCard key={song._id} item={song} />
                ))
        }
        </div>
        
    </div>
  )
}
const mapStateToProps = state => {
    //console.log(state)
    return {
      playerSong : state.playerSong
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    //   fetchSongToPlayAPICall:(obj)=>dispatch(fetchSongToPlayAPICall(obj))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongCategory)