import React from "react";
import ResponsiveDrawer from "../../components/sidebar/sidebar";
import './main.css'
import Header from "../../components/Header/Header";
import { Router, Route, Link } from 'react-router-dom';
import Footer from "../../components/footer/Footer";


const drawerWidth = 250;
const Main = (props) => {
  return (
      <div style={{ display: "flex", flexDirection:'column', overflowY:'hidden'}}>
        <div style={{display:'flex', overflowY: "scroll"}}>
        <ResponsiveDrawer style={{backgroundColor:"#040404"}} />
        
        <div className="body-container">
            <Header />
            <div className="body">

            </div>
          {/* <ResponsiveDrawer /> */}
          {/* <UsersContainer /> */}
          
          {/* <Box style={{ height: "100vh"}}>
            hello world
          </Box> */}
        </div>
        </div>
        
        
        <Footer />
        {/* <Main/> */}
      </div>
  );
};

export default Main;
