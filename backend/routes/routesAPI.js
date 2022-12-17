//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const usersData = data.usersData;
const asyncHandler = require('express-async-handler')
const { isProperString, isPasswordValid, validateUsernameNPassword } = require("../helpers");


const protectedArea= asyncHandler(async (req, res) => {
  res.status(200).send("user protected area");
})


// router.route("/").get(async (req, res) => {
//   if (req.session.user) return res.redirect("/protected");
//   res.status(401).send('dkjhfrwej');
// });

router
  .route("/register")
  .get(async (req, res) => {
    res.render("userRegister", { title: "Register" });
  })
  .post(async (req, res) => {
    try {
      let userName = req.body.userName;
      let password = req.body.password
      validateUsernameNPassword(userName, password);
    } catch (e) {
      return res
        .status(400)
        .render("userRegister", { title: "Register", error: e });
    }
    try{
      let response = await usersData.createUser(req.body);
      return res.status(201).json(response);
    } catch (error) {
      res.status(400).json(error);//using send will crash the code in edge case
    }
  });

router.route("/login").post(async (req, res) => {
 
  let userName = req.body.userName;
  let password = req.body.password;
  try {
    validateUsernameNPassword(userName, password);
  } catch (e) {
    return res
      .status(400)
      .render("userLogin", { title: "Login", error: e });
  }
  try {
    let response = await usersData.checkUser(userName, password);
    return res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error);
  }
});

// This is adding protection to the routes
router.get('/protected', protect, protectedArea);



module.exports = router;
