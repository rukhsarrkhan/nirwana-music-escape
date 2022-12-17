import {React, useState} from 'react'
import './search.css'
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import _debounce from 'lodash/debounce'
import {fetchSongs, fetchSongsAPICall} from '../../redux/generic/action'
import {makeSearch} from '../../redux/search/searchAction'
const SearchArea = ({makeSearch}) => {
  const [searchInput, setSearchInput] = useState("");
 
  const [debouncedCallApi] = useState(() => _debounce( makeSearch, 500));
  function handleChange(event){
    // if(event.target.value.trim().length==0) return
    setSearchInput(event.target.value)
    console.log(event.target.value)
   
  }
  useEffect(() => {
    //makeSearch(searchInput)
    debouncedCallApi(searchInput)
  }, [searchInput])
  function handleSearchCall(){
    (makeSearch(searchInput))
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
    searchData: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    makeSearch:(data)=>dispatch(makeSearch(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArea)