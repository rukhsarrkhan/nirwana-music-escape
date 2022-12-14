import React from 'react'
import './sidebar.css'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
const NavItem = ({option, Icon}) => {
  return (
    <ListItem className=".list-item" disablePadding>
    <ListItemButton>
      <ListItemIcon sx={{ color: "grey", minWidth: "30px" , ':hover':{color:'white'} } }>
        <Icon />
      </ListItemIcon>
      <ListItemText
        sx={{ color: "grey", fontWeight: "700", paddingTop: "3px", ':hover':{color:'white'}  }}
      >
        {option}
      </ListItemText>
    </ListItemButton>
  </ListItem>
  )
}
export default NavItem