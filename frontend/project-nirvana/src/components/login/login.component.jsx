import React from 'react';
import axios from 'axios';


// import { useNavigate } from "react-router-dom";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import coursesPage from './apiCall';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './login.css';


// const navigate = useNavigate();


class LoginComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }
  //   coursesPage = () => {
  //     navigate.push("/")
  // }
  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    console.log("email, password", email, password);
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log(error); 
    // }
    try {
      let resp = await axios.post('http://localhost:3000/login', {
        userName: email,
        password: password
      });
      console.log("resp", resp);
      // coursesPage()
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='Auth-form-container'>
        <h1>Sign in with your email and password</h1>
        <form onSubmit={this.handleSubmit} className='Auth-form'>
          <div className="Auth-form-content">

            <FormInput
              name='email'
              type='email'
              handleChange={this.handleChange}
              value={this.state.email}
              label='Enter User Name'
              required
            />
            <FormInput
              name='password'
              type='password'
              value={this.state.password}
              handleChange={this.handleChange}
              label='Enter Password'
              required
            />
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
  }
}

export default LoginComp;
