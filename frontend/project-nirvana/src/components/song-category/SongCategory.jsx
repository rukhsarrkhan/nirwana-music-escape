import React from 'react'
import SongCard from '../song-card/SongCard'
import './SongCategory.css'
const SongCategory = ({title, items}) => {
  return (
    <div className='category-viewer'>
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className='category-list'>
        {
               items.filter((item, idx)=>idx<4).map((item)=>(
                    <SongCard key={item.id} item={item} />
                ))
        }
        </div>
        
    </div>
  )
}

export default SongCategory