import React from "react";
import List from "@mui/material/List";
import NavItem from "./NavItem";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sidebar.css";

const styles = {
  root: {
    width: 200,
    background: "#040404",
  },
  listItem: {
    color: "grey !important",
    fontWeight: "bold",
    textTransform: "uppercase",
    "&:hover": {
      background: "#1ed760",
    },
  },
};
//const navigate = useNavigate('/')
const NavigationSidebar = () => {
  let navigate = useNavigate()
  return(
  <List className="navbar">
    <Link to="/" style={{textDecoration:'none'}}><NavItem option='Home' Icon={HomeIcon}/></Link>
    
    <NavItem option = "Search" Icon={SearchIcon}/>
    <Link to="/playlists" style={{textDecoration:'none'}}><NavItem option='Your Playlists' Icon={LibraryMusicIcon}/></Link>
    <Link to="/create-playlist" style={{textDecoration:'none'}}><NavItem option='Create Playlist' Icon={LibraryMusicIcon}/></Link>
    {/* <NavItem option = 'Your Playlist' Icon={LibraryMusicIcon} /> */}
</List>
);}




export default NavigationSidebar;
