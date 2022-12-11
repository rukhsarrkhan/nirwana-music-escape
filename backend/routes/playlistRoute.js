const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const playlistData = data.playlistsData;

  
  
  router.route("/").get(async (req, res) => {
    if (req.session.user) return res.redirect("/protected");
    res.status(401).send('dkjhfrwej');
  });
  
  router
    .route("/:userId")
    .get(async (req, res) => {
      try{
        //helper
      }catch(e){
        return res.status(400).json({ error:e });
      }
      try {
        let playlistGet = await playlistData.getAllPlaylist(req.params.userId);
        res.json(playlistGet)
      }catch(e){
       return res.status(404).json({ error:e })
      }
    })
    .post(async (req, res) => {
        
        const playlistPost = req.body
        try{
            //helper
            let response = await playlistData.createPlaylist(req.params.userId, req.body);
            return res.status(201).json(response)
        } catch (e) {
            res.status(400).json({error:e});
        }
        });
router
    .route('/playlist/:playlistId')
    .get(async (req, res) => {
      //const playlistPutData = req.body;
      try{
        let response = await playlistData.getPlaylist(req.params.playlistId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(404).json({error:e});
      }
    })
    .put(async (req, res) => {
      //const playlistPutData = req.body;
      try{
        let response = await playlistData.modifyPlaylist(req.params.playlistId, req.body);
        return res.status(200).json(response)
      }catch (e) {
        res.status(400).json({error:e});
    }
    })
    .delete(async (req, res) => {
      try{
        let response = await playlistData.deletePlaylist(req.params.playlistId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(400).json({error:e});
    }
    })
    .post(async (req, res) => {
        
      const songId = "63950bc60e6b87061a2e4ee0";
      try{
          let response = await playlistData.addSongs(req.params.playlistId, songId);
          return res.status(201).json(response)
      } catch (e) {
          res.status(400).json({error:e});
      }
      });

  
  module.exports = router;