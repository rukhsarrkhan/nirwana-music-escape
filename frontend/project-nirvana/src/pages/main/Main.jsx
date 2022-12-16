import React from "react";
import ResponsiveDrawer from "../../components/sidebar/sidebar";

import "./main.css";
import Header from "../../components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Homepage from "../Homepage/Homepage";
import CreatePlaylist from "../add-playlist/CreatePlaylist";
import LoginPage from "../login/login-page.component";
import RegisterPage from "../register/register-page.component";

const loggedIn = false;
const Main = (props) => {
  return (
    <div className="main">
      
      <div style={{ display: "flex" }}>
        { loggedIn && (<ResponsiveDrawer style={{ backgroundColor: "#040404" }} />)}

        <div className="body-container">
        { loggedIn &&  (<Header />)}
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/create-playlist" element={<CreatePlaylist />}></Route>
          </Routes>
        </div>
      </div>
      { loggedIn &&  (<Footer />)}
    </div>
  );
};

export default Main;
