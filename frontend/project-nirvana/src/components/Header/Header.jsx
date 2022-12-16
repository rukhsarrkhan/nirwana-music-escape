import React from 'react'
import './header.css'
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchArea from '../search/SearchArea';
const Header = () => {
  return (
    <div className="header">
      <SearchArea />
      <div className="user-area">
        <AccountCircleIcon style={{color:'white', transform:'scale(1.5'}} />
        {/* <h4>{user?.display_name}</h4> */}
      </div>
    </div>
  )
}

export default Header