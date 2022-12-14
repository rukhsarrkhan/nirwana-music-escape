import React from "react";
import "./footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { Grid, Slider } from "@mui/material";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__song-info">
        <img className="footer__song-info__logo" src="https://i.scdn.co/image/ab67616d0000b273395cf6e069baad4a7a61e688"></img>
        <div className="footer__song-info__title">
          <h4>Song name</h4>
        </div>
      </div>
      <div className="footer__player">
        <PlayCircleOutlineIcon
         // onClick={handlePlayPause}
          fontSize="large"
          className="footer__player__play-icon"
        />
      </div>
      <div className="footer__volume">
      <Grid container spacing={2}>
        <Grid item>
            <VolumeDownIcon />
        </Grid>
        <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
      </Grid>
      </div>
    </div>
  );
};

export default Footer;
