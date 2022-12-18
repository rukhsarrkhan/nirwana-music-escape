import React, { useState } from "react";
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      // const { user } = await auth.createUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      // await createUserProfileDocument(user, { firstName });

      let resp = await axios.post('http://localhost:3000/register', {
        firstName: firstName,
        lastName: lastName,
        userName: email,
        password: password,
        phoneNumber: phoneNumber
      });
      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    // this.setState({ [name]: value });
    if (name == 'firstName'){
      setFirstName(value)
    } else if ( name == 'lastName'){
      setLastName(value)
    } else if (name == 'email'){
      setEmail(value)
    } else if ( name == 'password'){
      setPassword(value)
    } else if (name == 'confirmPassword'){
      setConfirmPassword(value)
    } else if ( name == 'phoneNumber'){
      setPhoneNumber(value)
    }
  };

    return (
      <div className='Auth-form-container'>
        <h1>Sign up with your email and password</h1>
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
          <CustomButton type='submit'>REGISTER</CustomButton>
          </div>

        </form>
      </div>
    );

}

export default Register;
