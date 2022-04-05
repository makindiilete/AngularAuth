const express = require("express");
const router = express.Router();
const User = require("../models/users");

const mongoose = require("mongoose");

const db =
  "mongodb+srv://makindiilete:123999abc@angularauth.xph1z.mongodb.net/eventsdb?retryWrites=true&w=majority";

mongoose.connect(db, (err) => {
  console.log(`Connecting....`);
  if (err) {
    console.error(`Error! ${err}`);
  } else {
    console.log(`Connected to mongodb`);
  }
});
router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  // create a new user using d req body
  let user = new User(userData);

  user.save((error, registeredUser) => {
    if (error) console.log(error);
    else {
      res.status(200).send(registeredUser);
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) console.log(error);
    else {
      if (!user || user.password !== userData.password) {
        res.status(401).send("Invalid Login");
      } else {
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;
