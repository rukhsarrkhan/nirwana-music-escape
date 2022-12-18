import React, {useEffect} from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import SongCard from '../song-card/SongCard'

import './SongCategory.css'

const SongCategory = ({searchSong, songs, title}) => {
    //console.log('here')
//  console.log(props)
 //console.log(items)
//  useEffect(() => {
//    if(search)
//  }, [searchSong])
const [songsForRender, setSongsFormRender]= useState(songs)
 
// useEffect(() => {
//     // if (typeof serachSong !== "undefined" && Object.keys(playerSong).length > 0)
//     console.log(searchSong)
//   }, [searchSong])

  return (
    <div className='category-viewer'>
        <h1 className="title">{title}</h1>
        <div className='category-list'>
        {
            (searchSong!==undefined || searchSong.trim().length>0) &&   songs.filter((song, idx)=>idx<4 && song.songName.toLowerCase().includes(searchSong.trim().toLowerCase())).map((song)=>(
              <SongCard key={song._id} item={song} />
          ))
        }
        {  
            !(searchSong!==undefined) &&   songs.filter((song, idx)=>idx<4).map((song)=>(
                    <SongCard key={song._id} item={song} />
                ))
        }
        </div>
        
    </div>
  )
}
const mapStateToProps = state => {
    return {
      playerSong : state.playerSong,
      searchSong: state.searchSong.searchData
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      // fetchSongToPlayAPICall:(obj)=>dispatch(fetchSongToPlayAPICall(obj))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongCategory)