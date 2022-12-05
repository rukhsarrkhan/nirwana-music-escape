//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const usersData = data.usersData;
const asyncHandler = require('express-async-handler')
const { isProperString, isPasswordValid } = require("../helpers");


const protectedArea= asyncHandler(async (req, res) => {
  res.status(200).send("user protected area");
})


router.route("/").get(async (req, res) => {
  if (req.session.user) return res.redirect("/protected");
  res.status(401).send('dkjhfrwej');
});

router
  .route("/register")
  .get(async (req, res) => {
    if (req.session.user) return res.redirect("/protected");
    res.render("userRegister", { title: "Register" });
  })
  .post(async (req, res) => {
    try{
      let response = await usersData.createUser(req.body);
      return res.status(201).json(response);
    } catch (error) {
      res.sendStatus(400);
    }
  });

router.route("/login").post(async (req, res) => {
 
  let userName = req.body.userName;
  let password = req.body.password;
  try {
    let response = await usersData.checkUser(userName, password);
    return res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/protected', protect, protectedArea);

router.route("/logout").get(async (req, res) => {
  if (req.session.user) {
    res.clearCookie("AuthCookie");
    res.status(200).send(`Successfully logged out`);
  } else {
    res.redirect("/");
  }
});


module.exports = router;
