import React, { useEffect } from 'react';
import SongCategory from '../../components/song-category/SongCategory';
import { fetchSongsAPICall } from '../../redux/generic/action';
import { connect } from 'react-redux';

const Homepage = ({ fetchSongsAPICall, songs }) => {
  useEffect(() => {
    fetchSongsAPICall();
  }, []);
  return (
    <div style={{ display: 'grid', gridGap: '20px' }}>
      {
        Object.keys(songs).map(song => <SongCategory key={song}
          title={song}
          songs={songs[song]} />)
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
    songs: state.songs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSongsAPICall: (obj) => dispatch(fetchSongsAPICall(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);