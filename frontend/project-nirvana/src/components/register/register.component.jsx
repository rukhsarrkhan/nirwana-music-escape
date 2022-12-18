import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistrationAPICall } from '../../redux/users/userActions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './register.css';

const Register = ({ userData, userRegistrationAPICall }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (userData.user.data && userData.user.status === "OK" && userData.user.error === "") {
      navigate("/login");
    } else if (userData.user.error !== "") {
      setErrorMessage('Error: ' + userData.user.error);
    }
  }, [userData]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    const respObj = {
      firstName: firstName,
      lastName: lastName,
      userName: email,
      password: password,
      phoneNumber: phoneNumber,
      role: "user"
    };
    userRegistrationAPICall(respObj);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };
  const handleRequest = () => {
    navigate("/login");
  };

  return (
    <div className='Auth-form-container'>
      <div className='spaces'>
        <h1>Sign up with your email and password</h1>
        <CustomButton onClick={handleRequest}> Or Login </CustomButton>
      </div>

      <form className='Auth-form' onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <FormInput
            type='text'
            name='firstName'
            value={firstName}
            onChange={handleChange}
            label='Enter First Name'
            required
          />
          <FormInput
            type='text'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            label='Enter Last Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Enter Email Address'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='Enter Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <FormInput
            type='number'
            name='phoneNumber'
            value={phoneNumber}
            onChange={handleChange}
            label='Enter Phone Number'
            required
          />
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
          )}
          <div className='buttons'>
            <CustomButton type='submit'>Register</CustomButton>
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
    userRegistrationAPICall: (obj) => dispatch(userRegistrationAPICall(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);