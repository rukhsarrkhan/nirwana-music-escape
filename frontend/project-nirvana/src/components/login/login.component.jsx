import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUserAPICall, userRegistrationAPICall } from '../../redux/users/userActions';


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './login.css';

const LoginComp = ({ userData, loginUserAPICall }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();


  useEffect(() => {
    console.log("userData.user.data",userData)
    if (userData.user.data && userData.user.userLoggedIn == true) {
      if (userData.user.data.role == "admin"){
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (userData.user.error) {
      setErrorMessage('Please input correct username and password');
    }
  }, [userData]);

  const handleSubmit = async event => {
    event.preventDefault();
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log(error); 
    // }

    const loginObj = {
      userName: email,
      password: password
    };
    loginUserAPICall(loginObj);
    // try {
    //   let resp = await axios.post('http://localhost:3000/login', {
    //     userName: email,
    //     password: password
    //   });
    //   console.log("resp", resp);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    if (name == 'email') {
      setEmail(value);
    } else if (name == 'password') {
      setPassword(value);
    }
  };
  return (
    <div className='Auth-form-container'>
      <h1>Sign in with your email and password</h1>
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='Enter User Name'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            label='Enter Password'
            required
          />
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
          )}
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
          </div>
        </div>
      </form>
    </div>
  );

};

const mapStateToProps = state => {
  return {
    userData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUserAPICall: (obj) => dispatch(loginUserAPICall(obj)),
    userRegistrationAPICall: (obj) => dispatch(userRegistrationAPICall(obj))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComp);