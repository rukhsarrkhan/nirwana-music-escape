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
<<<<<<< HEAD
<<<<<<< HEAD
      let userName = req.body.userName;
      let password = req.body.password
      validateUsernameNPassword(userName, password);
=======
      validateUsernameNPassword(usernameInput, passwordInput);
>>>>>>> 2029ebc (validations for user authentication)
=======
      let userName = req.body.userName;
      let password = req.body.password
      validateUsernameNPassword(userName, password);
>>>>>>> ead7024 (feat: added route for frontend and also added seed files)
    } catch (e) {

      res.status(400).json(e);//using send will crash the code in edge case
    }
    try{
      let response = await usersData.createUser(req.body);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json(error);//using send will crash the code in edge case
    }
  });

router.route("/login").post(async (req, res) => {
 
  let userName = req.body.userName;
  let password = req.body.password;
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    validateUsernameNPassword(userName, password);
=======
    validateUsernameNPassword(usernameInput, passwordInput);
>>>>>>> 2029ebc (validations for user authentication)
=======
    validateUsernameNPassword(userName, password);
>>>>>>> ead7024 (feat: added route for frontend and also added seed files)
  } catch (e) {
    console.log("e",e)
    return res.status(400).json(e);//using send will crash the code in edge case
  }
  try {
    let response = await usersData.checkUser(userName, password);
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json(error);
  }
});

// This is adding protection to the routes
router.get('/protected', protect, protectedArea);



module.exports = router;
