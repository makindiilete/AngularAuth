const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { userEvents } = require("../data/events");

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

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

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
      let jwtPayload = { subject: registeredUser._id };
      let token = jwt.sign(jwtPayload, "secretKey");
      res.status(200).send({ token });
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
        let jwtPayload = { subject: user._id };
        let token = jwt.sign(jwtPayload, "secretKey");
        res.status(200).send({ token });
      }
    }
  });
});

router.get("/events", (req, res) => {
  res.status(200).send([
    {
      _id: "624c9b0bc7bdbca35074c22a",
      name: "Cupidatat consequat ut excepteur velit ad tempor eiusmod do aliqua aliqua ut voluptate reprehenderit.",
      description: "Sunt voluptate cupidatat ex ullamco cillum dolor enim.",
      date: "30-11-1971",
    },
    {
      _id: "624c9b0b20280a49e5336f0a",
      name: "Eiusmod aute nostrud cupidatat sit velit et velit ex duis aliqua dolor.",
      description:
        "Laboris consectetur aliqua consequat exercitation do anim incididunt non incididunt incididunt do.",
      date: "02-04-2014",
    },
    {
      _id: "624c9b0bc65d728d5c988c7e",
      name: "Nostrud aliquip reprehenderit ex amet dolor enim consequat.",
      description:
        "Cillum adipisicing mollit in exercitation non do ea officia ullamco.",
      date: "27-06-2010",
    },
    {
      _id: "624c9b0b09ac4c03641b352a",
      name: "Eiusmod elit elit veniam eu magna eiusmod nisi elit ex sunt Lorem enim do.",
      description: "Nulla ex adipisicing in in.",
      date: "02-02-2014",
    },
    {
      _id: "624c9b0b30eb04d7f84807da",
      name: "Veniam ea Lorem amet incididunt sint.",
      description: "Deserunt enim esse reprehenderit eiusmod irure.",
      date: "17-01-1973",
    },
    {
      _id: "624c9b0b45c3ddfaac169877",
      name: "Do ullamco occaecat proident adipisicing dolore id proident ut id incididunt qui aliquip veniam.",
      description: "Laboris eu minim dolore minim aliquip minim.",
      date: "22-08-2001",
    },
    {
      _id: "624c9b0b6bff5db46e81cc7d",
      name: "Aliqua sint dolor velit in cupidatat.",
      description: "Laboris qui irure eiusmod sunt non.",
      date: "19-06-2005",
    },
  ]);
});

router.get("/special", verifyToken, (req, res) => {
  res.status(200).send([
    {
      _id: "624c9b0bc7bdbca35074c22a",
      name: "Cupidatat consequat ut excepteur velit ad tempor eiusmod do aliqua aliqua ut voluptate reprehenderit.",
      description: "Sunt voluptate cupidatat ex ullamco cillum dolor enim.",
      date: "30-11-1971",
    },
    {
      _id: "624c9b0b20280a49e5336f0a",
      name: "Eiusmod aute nostrud cupidatat sit velit et velit ex duis aliqua dolor.",
      description:
        "Laboris consectetur aliqua consequat exercitation do anim incididunt non incididunt incididunt do.",
      date: "02-04-2014",
    },
    {
      _id: "624c9b0bc65d728d5c988c7e",
      name: "Nostrud aliquip reprehenderit ex amet dolor enim consequat.",
      description:
        "Cillum adipisicing mollit in exercitation non do ea officia ullamco.",
      date: "27-06-2010",
    },
    {
      _id: "624c9b0b09ac4c03641b352a",
      name: "Eiusmod elit elit veniam eu magna eiusmod nisi elit ex sunt Lorem enim do.",
      description: "Nulla ex adipisicing in in.",
      date: "02-02-2014",
    },
    {
      _id: "624c9b0b30eb04d7f84807da",
      name: "Veniam ea Lorem amet incididunt sint.",
      description: "Deserunt enim esse reprehenderit eiusmod irure.",
      date: "17-01-1973",
    },
    {
      _id: "624c9b0b45c3ddfaac169877",
      name: "Do ullamco occaecat proident adipisicing dolore id proident ut id incididunt qui aliquip veniam.",
      description: "Laboris eu minim dolore minim aliquip minim.",
      date: "22-08-2001",
    },
    {
      _id: "624c9b0b6bff5db46e81cc7d",
      name: "Aliqua sint dolor velit in cupidatat.",
      description: "Laboris qui irure eiusmod sunt non.",
      date: "19-06-2005",
    },
  ]);
});

module.exports = router;
