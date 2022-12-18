import { userReducer } from './users/userReducer';
import { songsReducer } from './generic/reducer';
import { playerReducer } from './songs/songReducer';
import { combineReducers } from 'redux';
import { searchReducer } from './search/searchReducer';
export default combineReducers({
    user: userReducer,
    songs: songsReducer,
    playerSong: playerReducer,
    searchSong: searchReducer
});