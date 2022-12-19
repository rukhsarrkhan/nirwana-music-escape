const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} =require('../middleware/authJwt')
const songsData = data.songsData;

router
  .route("/")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      let response = await songsData.fetchSongs(req.query.sort_by);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD re.body field validation in another try cath
      var obj = JSON.parse(req.body.body);
      let response = await songsData.uploadSong(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
  });

router
  .route("/fetchSongForPlaylistForm")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      console.log("here");
      let response = await songsData.fetchSongForPlaylistForm();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD id validation in another try cath
      helpers.checkObjectId(req.params.id)
      let response = await songsData.fetchSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD id fiekld validation in another try cath
      helpers.checkObjectId(req.params.id)
      let response = await songsData.deleteSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;

// handle response codes