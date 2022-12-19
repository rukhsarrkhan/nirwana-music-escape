import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "../../components/sidebar/sidebar";
import Header from "../../components/Header/Header";
import Homepage from "../Homepage/Homepage";
import CreatePlaylist from "../add-playlist/CreatePlaylist";
import LoginPage from "../login/login-page.component";
import RegisterPage from "../register/register-page.component";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import AdminPage from "../admin-page/admin-page.component";
import AdminPortal from "../admin-portal/admin-portal.component";

import "./main.css";
import ReroutePage from "../reroute-page/reroute-page";

import Playlist from "../playlists/Playlist";
const Main = ({ userData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userData.user.userLoggedIn === true) {
      if (userData.user.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsLoggedIn(true);
    } else if (userData.user.userLoggedIn === false) {
      setIsLoggedIn(false);
    }
  }, [userData]);

  return (
    <div className="main">
      <div style={{ display: "flex", maxHeight:'100vh' }}>
        {isLoggedIn && !isAdmin && (
          <ResponsiveDrawer style={{ backgroundColor: "#040404" }} />
        )}
        <div className="body-container">
          {isLoggedIn && <Header />}
          <Routes>
            {isLoggedIn && (
              <Route path="/dashboard" element={<Homepage />}></Route>
            )}
            {isLoggedIn && (
              <Route path="/playlists" element={<Playlist />}></Route>
            )}
            <Route path="/" element={<ReroutePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            {isLoggedIn && (
              <Route
                path="/create-playlist"
                element={<CreatePlaylist />}
              ></Route>
            )}
            {isLoggedIn && (
              <Route path="/admin" element={<AdminPage />}></Route>
            )}
            {isLoggedIn && (
              <Route path="/admin-portal" element={<AdminPortal />}></Route>
            )}

            <Route path="*" element={<ReroutePage />}></Route>
          </Routes>
        </div>
      </div>
      {isLoggedIn && !isAdmin && <MusicPlayer />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps)(Main);
