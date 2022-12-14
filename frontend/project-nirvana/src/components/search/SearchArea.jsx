import {React, useState} from 'react'
import './search.css'
import SearchIcon from '@mui/icons-material/Search';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import _debounce from 'lodash/debounce'
import {fetchSongs, fetchSongsAPICall} from '../../redux/generic/action'
const SearchArea = ({fetchSongs, fetchSongsAPICall}) => {
  const [searchInput, setSearchInput] = useState("");
  //const debounceApiCall = useCallback(_debounce(fetchSongsAPICall(), 10000),[])
  const [debouncedCallApi] = useState(() => _debounce(fetchSongsAPICall, 1000));
  function handleChange(event){
    console.log(searchInput)
    setSearchInput(event.target.value)
    debouncedCallApi()
    //debounceApiCall(searchInput)
  }
  return (
    <div className="search-area">
        <SearchIcon />
        <input
          placeholder="What do you want to listen to?"
          type="text"
          value={searchInput}
          onChange= {handleChange}
        />
      </div>
  )
}

const mapStateToProps = state => {
  return {
    userData: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongsAPICall:()=>dispatch(fetchSongsAPICall())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArea)