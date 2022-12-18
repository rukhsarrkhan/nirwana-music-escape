import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import NavItem from "./NavItem";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
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

const NavigationSidebar = ({ userData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    console.log("userData.user.data", userData);
    if (userData.user.data && userData.user.userLoggedIn === true) {
      if (userData.user.data.role === "user") {
        setFirstName(userData.user.data.firstName);
        setLastName(userData.user.data.lastName);      } 
    }
  }, [userData]);

  return (
    <List className="navbar">
      {firstName && (<h2>Hi, {firstName} {lastName}</h2>)}
      <Link to="/" style={{ textDecoration: 'none' }}><NavItem option='Home' Icon={HomeIcon} /></Link>
      <Link to="/playlists" style={{ textDecoration: 'none' }}><NavItem option='Your Playlists' Icon={LibraryMusicIcon} /></Link>
      <Link to="/create-playlist" style={{ textDecoration: 'none' }}><NavItem option='Create Playlist' Icon={LibraryMusicIcon} /></Link>
    </List>
  );
};


const mapStateToProps = state => {
  return {
    userData: state
  };
};

export default connect(
  mapStateToProps
)(NavigationSidebar);