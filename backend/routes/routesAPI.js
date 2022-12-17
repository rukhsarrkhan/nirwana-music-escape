//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const usersData = data.usersData;
const asyncHandler = require('express-async-handler')
const { isProperString, isPasswordValid, validateUsernameNPassword,validateCheckUser } = require("../helpers");


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
      let userName = req.body.username;
      let password = req.body.password;
      let phoneNumber = req.body.phoneNumber;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      validateUsernameNPassword(userName, password, phoneNumber,firstName,lastName);
    } catch (e) {

      return res.status(400).json(e);//using send will crash the code in edge case
    }
    try{
      let response = await usersData.createUser(req.body);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json(error);//using send will crash the code in edge case
    }
  });

router.route("/login")
.post(async (req, res) => {
 console.log(req.body)
 let username = req.body.userName;
 let password = req.body.password;
  try {
    validateCheckUser(username, password);
    console.log(username,password)
  } catch (e) {
    console.log("e",e)
    return res.status(400).json(e);//using send will crash the code in edge case
  }
  try {
    let response = await usersData.checkUser(username, password);
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

// This is adding protection to the routes
router.get('/protected', protect, protectedArea);



module.exports = router;
