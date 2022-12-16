import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SHOP_DATA from './shop_data';
import SongCategory from '../../components/song-category/SongCategory';
const Homepage = () => {
  return (
    <div style={{display:'grid', gridGap:'20px'}}>
        {
                    SHOP_DATA.map(({id, ...otherCollectionProps}) => (
                        <SongCategory key={id}{...otherCollectionProps} />
                    ))
        }
    </div>
    
  )
}
 
export default Homepage