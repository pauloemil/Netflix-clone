const Router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Register
Router.post("/register", (req, res) => {
  console.log(123, req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    profilePic: req.body.profilePic,
  });

  User.create(newUser, (err, user) => {
    if (err) res.json({ authRoutRegister: err.message });
    else res.json(user);
  });
});

Router.post("/login", (req, res) => {
  User.findOne(
    { email: req.body.email },

    (err, user) => {
      const originalPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (err) {
        res.json({ authRoutLogin: err.message });
      } else if (originalPassword == req.body.password) {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;
        res.json({ info, accessToken });
      } else {
        res.json("Wrong Credentials!");
      }
    }
  );
});

module.exports = Router;
