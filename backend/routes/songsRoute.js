const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const songsData = data.songsData;
const {validatesongs} = require("../helpers");

router
  .route("/")
  .get(async (req, res) => {
    try{
      console.log("here")
      // TO DO: ADD sort_by fiekld validation in another try cath
      let response = await songsData.fetchSongs(req.query.sort_by);
      return res.status(200).json(response);
    } catch (error) {
      return res.send(400).json(error);
    }
  })
  .post(async (req, res) => {
    console.log(req.body)
    try {
      let songName= req.body.songName;
      let genre= req.body.genre;
      let artist= req.body.artist;
      validatesongs(songName,genre,artist);
      // console.log(songName)
    } catch (e) {
// console.log(e)
      return res.status(400).json(e);//using send will crash the code in edge case
    }
    try{
      // TO DO: ADD re.body field validation in another try cath

      console.log("req.body",req.body)
      let response = await songsData.uploadSong(req.body);
      return res.status(201).json(response);
    } catch (error) {
      console.log("error",error)
      return res.send(400).json(error);
    }
  })

  router
  .route("/fetchSongForPlaylistForm")
  .get(async (req, res) => {
    try{
      console.log("here")
      let response = await songsData.fetchSongForPlaylistForm();
      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(400);
    }
  })
router
  .route("/:id")
  .get(async (req, res) => {
    // try {
    //   validateId(req.params.id);
    // } catch (e) {
    //   return res.status(400).json("invalid id");
    // }
    inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID';
  }
    try{
      console.log("here")
      // TO DO: ADD id validation in another try cath

      let response = await songsData.fetchSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.log("error",error)
      return res.send(400).json(error);
    }
  })
  .delete(async (req, res) => {
    // try {
    //   validateId(req.params.id);
    // } catch (e) {
    //   return res.status(400).json("invalid id");
    // }
    inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID';
  }
    try{
    // TO DO: ADD id fiekld validation in another try cath

      let response = await songsData.deleteSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.send(400).json(error);
    }
  });

  



module.exports = router;



// handle response codes