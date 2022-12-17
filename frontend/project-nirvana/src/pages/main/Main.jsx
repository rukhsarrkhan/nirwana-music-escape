import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import ResponsiveDrawer from "../../components/sidebar/sidebar";

import "./main.css";
import Header from "../../components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Homepage from "../Homepage/Homepage";
import CreatePlaylist from "../add-playlist/CreatePlaylist";
import LoginPage from "../login/login-page.component";
import RegisterPage from "../register/register-page.component";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import AdminPage from "../admin-page/admin-page.component";
import AdminPortal from "../admin-portal/admin-portal.component";

const Main = ({ userData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    console.log("userData-------", userData);
    if (userData.user.userLoggedIn == true) {
      setIsLoggedIn(true)
    } else if (userData.user.userLoggedIn == false) {
      setIsLoggedIn(false)
    }
  }, [userData]);

  return (
    <div className="main">
      
      <div style={{ display: "flex" }}>
        { isLoggedIn && (<ResponsiveDrawer style={{ backgroundColor: "#040404" }} />)}

        <div className="body-container">
        {  isLoggedIn && (<Header />)}
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/create-playlist" element={<CreatePlaylist />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/admin-portal" element={<AdminPortal />}></Route>

          </Routes>
        </div>
      </div>
      {isLoggedIn && (<MusicPlayer />)}
    </div>
  );
};


const mapStateToProps = state => {
  console.log(state);
  return {
    userData: state
  };
};

export default connect(
  mapStateToProps
)(Main);