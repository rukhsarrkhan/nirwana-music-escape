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
      try {
        validateId(req.params.userId);
      } catch (e) {
        return res.status(400).json("invalid id");
      }
      try{
        // TO DO: ADD userId fiekld validation in another try cath

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
        try {
          validateId(req.params.userId);
        } catch (e) {
          return res.status(400).json("invalid id");
        }
        try{
            //helper
            // TO DO: ADD req.params.userId, req.body fiekld validation in another try cath

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
      try {
        validateId(req.params.playlistId);
      } catch (e) {
        return res.status(400).json("invalid id");
      }
      // TO DO: Add playlistId validation in another try catch 
      try{
        let response = await playlistData.getPlaylist(req.params.playlistId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(404).json({error:e});
      }
    })
    .put(async (req, res) => {
      //const playlistPutData = req.body;
      // try {
      //   validateId(req.params.playlistId);
      // } catch (e) {
      //   return res.status(400).json("invalid id");
      // }
      inputStringValidation(req.paramsplaylistId);
  id = id.trim();
  if (!ObjectId.isValid(playlistId)) {
    throw 'Invalid object ID';
  }
            // TO DO: Add req.params.playlistId, req.body validation in another try catch 
      try{
        let response = await playlistData.modifyPlaylist(req.params.playlistId, req.body);
        return res.status(200).json(response)
      }catch (e) {
        res.status(400).json({error:e});
    }
    })
    .delete(async (req, res) => {
      // try {
      //   validateId(req.params.playlistId);
      // } catch (e) {
      //   return res.status(400).json("invalid id");
      // }
      inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID';
  }
      try{
                    // TO DO: Add req.params.playlistId in another try catch 
        let response = await playlistData.deletePlaylist(req.params.playlistId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(400).json({error:e});
    }
    })

router
    .route('/playlist/:playlistId/songs/:songId')
    .post(async (req, res) => { 
      // try {
      //   validateId(req.params.playlistId);
      // } catch (e) {
      //   return res.status(400).json("invalid id");
      // }
      inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID';
  }
      try {
        validateId(req.params.songId);
      } catch (e) {
        return res.status(400).json("invalid id");
      }

      try{
                    // TO DO: Add req.params.playlistId, req.body validation in another try catch 
          let response = await playlistData.addSongs(req.params.playlistId, req.params.songId);
          return res.status(201).json(response)
      } catch (e) {
          res.status(400).json({error:e});
      }
      })

    .delete(async (req, res) => {
      try {
        validateId(req.params.playlistId);
      } catch (e) {
        return res.status(400).json("invalid id");
      }
      try {
        validateId(req.params.songId);
      } catch (e) {
        return res.status(400).json("invalid id");
      }
      try{
                    // TO DO: Add req.params.playlistId, req.body validation in another try catch 
        let response = await playlistData.deleteSongs(req.params.playlistId, req.params.songId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(400).json({error:e});
    }
    })

  
  module.exports = router;