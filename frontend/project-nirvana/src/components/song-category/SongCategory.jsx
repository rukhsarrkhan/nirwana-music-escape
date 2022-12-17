import React from 'react'
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

export default SongCategory