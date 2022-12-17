import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { FormData } from 'form-data';
import $ from 'jquery';


import FormInput from '../form-input/form-input.component';
import FormInput2 from "../form-input2/form-input2.component";
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './admin.css';

const Admin = (props) => {

  const [songName, setSongName] = useState('');
  const [song, setSong] = useState();
  const [songNameInFile, setSongNameByFile] = useState('');

  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log(error); 
    // }

  //   const buffer = await song.arrayBuffer()

  //   const formData = new FormData();
  //   formData.append('songName', songName);
  //   formData.append('song', buffer);
  //   formData.append('genre', genre);
  //   formData.append('artist', artist);
  // console.log(buffer)
  //   try {
  //     let resp = await axios.post('http://localhost:3000/songs', {
  //       formData
  //     });
  //     console.log("resp", resp);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log("song",song)


    var reader = new FileReader();
  // reader.onload = function() {

  //   var arrayBuffer = this.result,
  //     array = new Uint8Array(arrayBuffer),
  //     binaryString = String.fromCharCode.apply(null, array);

  //   console.log(binaryString);

  // }
  reader.readAsArrayBuffer(song);
  console.log("reader",reader)

    // const formData = new FormData();
    // // formData.append('file', song);
    // // formData.append('fileName', song.name);
    // formData.append('songName', songName);
    // formData.append('song', reader);
    // formData.append('genre', genre);
    // formData.append('artist', artist);

    $.ajax({
      url: "http://localhost:3000/songs",
      type: 'POST',
      data: JSON.stringify({
        songName: songName,
        song: reader,
        genre: genre,
        artist: artist
      }),
      contentType: "application/json",
      headers: {
        'content-type': 'application/json',
      },
      processData: false,
      contentType: false,
      cache: false,
      success: function (data) {
        console.log("success");
        // Success..
        // this.setState({
        //   contactEmail: 'success',
        //   contactMessage: '<h1>Kontakt skickad!</h1><p>Återkommer så fort som möjligt.</p>'
        // });
        // $('#formContact').slideUp();
        // $('#formContact').after(this.state.contactMessage);
        console.log('success', data);
      }.bind(this),
      // Fail..
      error: function (xhr, status, err) {
        console.log(xhr, status);
        console.log(err);
        // this.setState({
        //   contactEmail: 'danger',
        //   contactMessage: '<h1>Sorry det blev fel</h1><p>Försök gärna igen, eller mejla mig direkt på magdamargaretha@gmail.com</p>'
        // });
        // console.log(this.state.contactEmail + this.state.contactMessage + 'fail');
      }.bind(this)
    });
  };

  const handleChange = event => {
    const { value, name, files } = event.target;
    console.log("value",value)

    console.log("files",files)
    if (name == 'songName') {
      setSongName(value);
    } else if (name == 'song') {
      setSong(files[0]);
      setSongNameByFile(files[0].name)
    } else if (name == 'genre') {
      setGenre(value);
    } else if (name == 'artist') {
      setArtist(value);
    }
  };
  return (
    <div className='Auth-form-container'>
      <h1>Upload song to Nirwana</h1>
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <FormInput
            name='songName'
            type='text'
            handleChange={handleChange}
            value={songName}
            label='Enter Song Name'
            required
          />
          <FormInput2
            name='song'
            type='file'
            // value={songNameInFile}
            handleChange={handleChange}
            label='Upload Song'
            required
          />
          {/* <input name='song' type="file" value={song} accept="audio/mp3" onChange={handleChange} label='Upload Song' required/> */}
          <FormInput
            name='genre'
            type='text'
            value={genre}
            handleChange={handleChange}
            label='Enter Genre'
            required
          />
          <FormInput
            name='artist'
            type='text'
            value={artist}
            handleChange={handleChange}
            label='Enter Artist'
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

};

export default Admin;
