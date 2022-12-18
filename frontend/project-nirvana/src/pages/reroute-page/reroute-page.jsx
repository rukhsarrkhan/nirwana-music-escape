import React, { useEffect, useState } from 'react';
import SongCategory from '../../components/song-category/SongCategory';
import { fetchSongsAPICall } from '../../redux/generic/action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './reroute-page.css';

const ReRoute = ({ fetchSongsAPICall, userData }) => {

  const [isLogin, setIsLogin] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (userData.user.data && userData.user.userLoggedIn == true) {
      setIsLogin(true);
      navigate("/dashboard");
    } else {
      setIsLogin(false);
      navigate("/login");
    }
  }, [userData]);

  return (
    <div className='Auth-form-container'>
      {
        !isLogin && (
          <h1>Please access a correct route</h1>
        )
      }
      </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(
  mapStateToProps
)(ReRoute);