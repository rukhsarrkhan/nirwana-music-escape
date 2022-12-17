import React from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './register.css';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = this.state;

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

      // this.setState({
      //   firstName: '',
      //   email: '',
      //   password: '',
      //   confirmPassword: ''
      // });

      let resp = await axios.post('http://localhost:3000/register', {
        firstName: firstName,
        lastName: lastName,
        userName: email,
        password: password,
        phoneNumber: phoneNumber
      });
      console.log("rspo",resp)
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = this.state;
    return (
      <div className='Auth-form-container'>
        <h1>Sign up with your email and password</h1>
        <form className='Auth-form' onSubmit={this.handleSubmit}>
          <div className='Auth-form-content'>
          <FormInput
            type='text'
            name='firstName'
            value={firstName}
            onChange={this.handleChange}
            label='Enter First Name'
            required
          />
          <FormInput
            type='text'
            name='lastName'
            value={lastName}
            onChange={this.handleChange}
            label='Enter Last Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Enter Email Address'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Enter Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <FormInput
            type='number'
            name='phoneNumber'
            value={phoneNumber}
            onChange={this.handleChange}
            label='Enter Phone Number'
            required
          />
          <CustomButton type='submit'>REGISTER</CustomButton>
          </div>

        </form>
      </div>
    );
  }
}

export default Register;
