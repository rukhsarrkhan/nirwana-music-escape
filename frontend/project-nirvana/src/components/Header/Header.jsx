import React from 'react'
import './header.css'
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {
  return (
    <div className="header">
      <div className="search-area">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="user-area">
        <AccountCircleIcon style={{color:'white', transform:'scale(1.5'}} />
        {/* <h4>{user?.display_name}</h4> */}
      </div>
    </div>
  )
}

export default Header