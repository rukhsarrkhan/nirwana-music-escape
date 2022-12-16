const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const songsData = data.songsData;

router
  .route("/")
  .get(async (req, res) => {
    try{
      console.log("here")
      let response = await songsData.fetchSongs(req.query.sort_by);
      return res.status(200).json(response);
    } catch (error) {
      return res.send(400).json(error);
    }
  })
  .post(async (req, res) => {
    try{
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
    try{
      console.log("here")
      let response = await songsData.fetchSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.log("error",error)
      return res.send(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try{
      let response = await songsData.deleteSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.send(400).json(error);
    }
  });

  



module.exports = router;



// handle response codes