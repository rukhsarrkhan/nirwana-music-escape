import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './admin-screen.css';

const AdminScreen = (props) => {

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

  const handleRequest = () => {
    navigate("/admin");
  };

  return (
    <div className='Auth-form-container'>
      
      <div className='spaces'>
      <h1>Delete song from Nirwana</h1>
      <CustomButton onClick={handleRequest}> Or Upload Songs </CustomButton>

      </div>
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <div style={{ marginTop: 40, marginBottom: 40 }}>
            {items.map((data) => (
              <li key={data._id}>
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
