import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import FormInput2 from "../form-input2/form-input2.component";
import CustomButton from '../custom-button/custom-button.component';
import { uploadAPISongCall } from "../../redux/songs/songActions";

import './admin.css';

const Admin = ({ songData, uploadAPISongCall }) => {

  const [songName, setSongName] = useState('');
  const [song, setSong] = useState();
  const [songNameInFile, setSongNameByFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (songData.playerSong.songUploadData && songData.playerSong.status == "OK") {
      navigate("/admin-portal");
    } else if (songData.playerSong.songUploadError) {
      setErrorMessage('Error: ' + songData.playerSong.songUploadError);
    }
  }, [songData]);

  function formDataToJson(formData) {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return JSON.stringify(obj);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    var reader = new FileReader();

    reader.readAsArrayBuffer(song);


    let formData = new FormData();
    formData.append('songName', songName);
    formData.append('song', reader);
    formData.append('genre', genre);
    formData.append('artist', artist);

    const songObj = {
      body: formDataToJson(formData)
    };
    uploadAPISongCall(songObj);
  };

  const handleChange = event => {
    const { value, name, files } = event.target;

    if (name == 'songName') {
      setSongName(value);
    } else if (name == 'song') {
      setSong(files[0]);
      setSongNameByFile(files[0].name);
    } else if (name == 'genre') {
      setGenre(value);
    } else if (name == 'artist') {
      setArtist(value);
    }
  };


  const handleRequest = () => {
    navigate("/admin-portal");
  };

  return (
    <div className='Auth-form-container'>
      <div className='spaces'>
      <h1>Upload song to Nirwana</h1>
      <CustomButton onClick={handleRequest}> Or Delete Songs </CustomButton>
      </div>

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
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
          )}
          <div className='buttons'>
            <CustomButton type='submit'> Upload </CustomButton>
            

          </div>
        </div>
      </form>
    </div>
  );

};


const mapStateToProps = state => {
  return {
    songData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAPISongCall: (obj) => dispatch(uploadAPISongCall(obj))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);