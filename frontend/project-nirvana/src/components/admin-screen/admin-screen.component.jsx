import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { FormData } from 'form-data';
import $ from 'jquery';


import FormInput from '../form-input/form-input.component';
import FormInput2 from "../form-input2/form-input2.component";
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './admin-screen.css';

const AdminScreen = (props) => {

  const [songName, setSongName] = useState('');
  const [song, setSong] = useState();
  const [songNameInFile, setSongNameByFile] = useState('');

  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');


  const [items, setItems] = useState([]);

  let [newitems, setnewitems] = useState([]);
  newitems = items;

  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:3000/songs');
    console.log("data",data)
    // set state with the result
    // setItems(data);
    console.log("items",items)
    return data;
  };

  useEffect(() => {

    // call the function
    fetchData().then((items) => {
      console.log("items",items)
      setItems(items)
    });
      // make sure to catch any error
  }, []);

  let navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

  };

  const deleteItem = async (getID) => {
    let resp = await axios.delete('http://localhost:3000/songs/' + getID);
    if (resp.status == 200 && resp.statusText == "OK"){
      setItems(newitems.filter((single) => single._id !== getID));
    }
  };

  const handleChange = event => {
    const { value, name, files } = event.target;
    console.log("value", value);

    console.log("files", files);
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
  return (
    <div className='Auth-form-container'>
      <h1>Delete song from Nirwana</h1>
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <div style={{ marginTop: 40, marginBottom: 40 }}>
            {items.map((data) => (
              <li>
                {data.songName}
                <button
                  onClick={() => deleteItem(data._id)}
                  color="primary"
                  style={{ marginLeft: 20 }}
                >
                  Delete
                </button>
                {/* <div className='buttons'>
            <CustomButton type='submit' onClick={() => deleteItem(data.id)}> Delete </CustomButton>
          </div> */}
              </li>
            ))}
          </div>

        </div>
      </form>
    </div>
  );

};

export default AdminScreen;
