const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const playlistData = data.playlist;
const asyncHandler = require('express-async-handler')
const { isProperString, isPasswordValid } = require("../helpers");
const { response } = require("express");

const protectedArea= asyncHandler(async (req, res) => {
    res.status(200).send("user protected area");
  })
  
  
  router.route("/").get(async (req, res) => {
    if (req.session.user) return res.redirect("/protected");
    res.status(401).send('dkjhfrwej');
  });
  
  router
    .route("/:userId")
    .get(async (req, res) => {
      //if (req.session.user) return res.redirect("/Homepage");
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
            var response = await playlistData.createPlaylist(req.body);
        } catch (error) {
            res.sendStatus(400).json({error:e});
        }
        try{
            let playlistPostData = await playlistData.createPlaylist(
                req.params.userId,
                playlistPost.playlistId,
                playlistPost.playlistName,
                playlistPost.description,
                playlistPost.songs
            );
            res.json(playlistPostData)
        }catch(e){
            return res.status(500).json({error:e});
        }
        if(response.playlistInserted){
            res.redirect('/HomePage');
        }else{
            res.status(400).render('ErrorPage',{error:e})
        }
        });

//     router
//     .route('/review/:reviewId')
//     .get(async (req, res) => {
//         //code here for GET
//         try {
//         helpersList.checkObjectId(req.params.reviewId);
//         helpersList.checkEmpty(req.params.reviewId);
//         helpersList.checkOrdString(req.params.reviewId);
//         }
//         catch (e) {
//         return res.status(400).json({ error: e });
//         }
//         try {
//         const reviewGet = await reviewData.getReview(req.params.reviewId);
//         res.json(reviewGet);
//         } catch (e) {
//         return res.status(404).json({ error: e });
//         }
//     })
//     .delete(async (req, res) => {
//         //code here for DELETE
//         try {
//         helpersList.checkObjectId(req.params.reviewId);
//         helpersList.checkEmpty(req.params.reviewId);
//         helpersList.checkOrdString(req.params.reviewId);
//         }
//         catch (e) {
//         return res.status(400).json({ error: e });
//         }
//         try {
//         const reviewDelete = await reviewData.removeReview(req.params.reviewId);
//         res.json(reviewDelete);
//         }catch(e){
//         return res.status(500).json({error:e})
//         }
//     });
//   router.get('/protected', protect, protectedArea);
  
// //   router.route("/logout").get(async (req, res) => {
// //     if (req.session.user) {
// //       res.clearCookie("AuthCookie");
// //       res.status(200).send(`Successfully logged out`);
// //     } else {
// //       res.redirect("/");
// //     }
// //   });
  
  
  module.exports = router;