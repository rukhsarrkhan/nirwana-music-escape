import React, { useState, useEffect } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import { MultiSelect } from "react-multi-select-component";
import {connect} from 'react-redux'
import { useNavigate } from "react-router";
import axios from 'axios'
const CreatePlaylist = ({userData, state}) => {
  let navigate = useNavigate()
  console.log(userData)
  console.log(state)
  const[options, setOptions] = useState([])
  const loadSongs = async()=>{
    let {data} = await axios.get("http://localhost:3000/songs/fetchSongForPlaylistForm")
    console.log(data)
    setOptions(data)
  }
  // let id=''
  // useEffect(() => {
  //   id = userData.data._id
  // }, [userData])
  
  const postPlaylist=async(val)=>{
    console.log(val)
    let id = userData.data._id
    console.log(id)
    let {data} = await axios.post("http://localhost:3000/playlists/"+id, val)
    console.log(data)
    navigate('/playlists')
  }
  const reqBody ={}
  useEffect(() => {
     loadSongs()
   }, [])

  
  const [values, setValues] = useState({
    playlistName: "",
    description: "",
    songs: [],
  });
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    values.songs=selected
  },[selected, values])
  const handleNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      playlistName: event.target.value,
    }));
  };
  const handleDescInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

 
  const handleRequest = (event) => {
    const req = {
      songs:selected,
      ...values
    }
    postPlaylist(values)
  };
  return (
    <>
      <FormInput
        name="name"
        type="text"
        handleChange={handleNameInputChange}
        value={values.name}
        label="Name:"
        required
      />
      <FormInput
        name="description"
        type="text"
        handleChange={handleDescInputChange}
        value={values.desc}
        label="description:"
        required
      />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <button
        onClick={() => {
          handleRequest()
        }}
      >
        Add
      </button>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state )
  // console.log(state)
  return {
    userData: state.user,
    state:state
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlaylist)
