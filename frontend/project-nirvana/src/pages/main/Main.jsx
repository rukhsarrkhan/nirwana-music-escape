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
        </div>
        </div>
        {/* <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route> */}
        <Footer />
      </div>
  );
};

export default Main;
