const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const { protect } = require('../middleware/authJwt');
const playlistData = data.playlistsData;

  
  

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
        let playlistGet = await playlistData.getAllPlaylist(req.user);
        return res.status(200).json(playlistGet)
      }catch(e){  
       return res.status(404).json({ error:e })
      }
    })
    .post(async (req, res) => {
      try {
        let token = protect(req.headers)
        req.user = token.id
      } catch (error) {
        return res.status(401).send(error)
      }
        const playlistPost = req.body
        try{
            //helper
            // TO DO: ADD req.params.userId, req.body fiekld validation in another try cath

            let response = await playlistData.createPlaylist(req.user, req.body);
            return res.status(201).json(response)
        } catch (e) {
            res.status(400).json({error:e});
        }
        });
router
    .route('/playlist/:playlistId')
    .get(async (req, res) => {
      //const playlistPutData = req.body;
      // TO DO: Add playlistId validation in another try catch 
      try {
        let token = protect(req.headers)
        req.user = token.id
      } catch (error) {
        return res.status(401).send(error)
      }
      try{
        let response = await playlistData.getPlaylist(req.params.playlistId);
        return res.status(200).json(response)
      }catch (e) {
        res.status(404).json({error:e});
      }
    })

// Working functionalities commented as not using as of now

    // .put(async (req, res) => {
    //   //const playlistPutData = req.body;
    //         // TO DO: Add req.params.playlistId, req.body validation in another try catch 
    //         try {
    //           let token = protect(req.headers)
    //           req.user = token.id
    //         } catch (error) {
    //           return res.status(401).send(error)
    //         }
    //   try{
    //     let response = await playlistData.modifyPlaylist(req.params.playlistId, req.body);
    //     return res.status(200).json(response)
    //   }catch (e) {
    //     res.status(400).json({error:e});
    // }
    // })
    // .delete(async (req, res) => {
    //   try {
    //     let token = protect(req.headers)
    //     req.user = token.id
    //   } catch (error) {
    //     return res.status(401).send(error)
    //   }
    //   try{
    //                 // TO DO: Add req.params.playlistId in another try catch 
    //     let response = await playlistData.deletePlaylist(req.params.playlistId);
    //     return res.status(200).json(response)
    //   }catch (e) {
    //     res.status(400).json({error:e});
    // }
  //  })

// router
//     .route('/playlist/:playlistId/songs/:songId')
//     .post(async (req, res) => { 
//       try {
//         let token = protect(req.headers)
//         req.user = token.id
//       } catch (error) {
//         return res.status(401).send(error)
//       }
//       try{
//                     // TO DO: Add req.params.playlistId, req.body validation in another try catch 
//           let response = await playlistData.addSongs(req.params.playlistId, req.params.songId);
//           return res.status(201).json(response)
//       } catch (e) {
//           res.status(400).json({error:e});
//       }
//       })

//     .delete(async (req, res) => {
//       try {
//         let token = protect(req.headers)
//         req.user = token.id
//       } catch (error) {
//         return res.status(401).send(error)
//       }
//       try{
//                     // TO DO: Add req.params.playlistId, req.body validation in another try catch 
//         let response = await playlistData.deleteSongs(req.params.playlistId, req.params.songId);
//         return res.status(200).json(response)
//       }catch (e) {
//         res.status(400).json({error:e});
//     }
//   })

//   .delete(async (req, res) => {
//     try {
//       // TO DO: Add req.params.playlistId, req.body validation in another try catch 
//       let response = await playlistData.deleteSongs(req.params.playlistId, req.params.songId);
//       return res.status(200).json(response);
//     } catch (e) {
//       res.status(400).json({ error: e });
//     }
//   });


module.exports = router;