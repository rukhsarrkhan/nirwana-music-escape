import React from "react";
import List from "@mui/material/List";
import NavItem from "./NavItem";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
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

const NavigationSidebar = () => (
  <List className="navbar">
    <img
        className="logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
    <NavItem option='Home' Icon={HomeIcon}/>
    <NavItem option = "Search" Icon={SearchIcon} />
    <NavItem option = 'Your Library' Icon={LibraryMusicIcon}/>
  </List>
);

export default NavigationSidebar;
