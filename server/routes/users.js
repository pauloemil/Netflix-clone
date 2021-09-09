const Router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");

// update
Router.put("/:id", verifyToken, (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password)
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.ACCESS_SECRET_KEY
      ).toString();

    if (req.body.isAdmin) delete req.body.isAdmin;

    User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, //to do: make specific columns for security reasons!
      { new: true },
      (err, updatedUser) => {
        if (err) res.json({ usersRoutePUT: err.message });
        else res.json(updatedUser);
      }
    );
  } else {
    res.sendStatus(401);
  }
});
// delete
Router.delete("/:id", verifyToken, (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    User.findByIdAndDelete(req.params.id, (err) => {
      if (err) res.json({ usersRouteDELETE: err.message });
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});
// get
Router.get("/find/:id", verifyToken, (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    User.findById(req.params.id, { password: 0 }, (err, user) => {
      if (err) res.json({ usersRouteGET: err.message });
      else if (!user) res.sendStatus(404);
      else res.json(user);
    });
  } else {
    res.sendStatus(401);
  }
});
// get all
Router.get("/", verifyToken, (req, res) => {
  const query = req.query.new;
  console.log(query);
  if (req.user.isAdmin) {
    User.find({}, { password: 0 }, (err, users) => {
      if (err) res.json({ usersRouteGETAll: err.message });
      else res.json(users);
    })
      .sort({ _id: -1 })
      .limit(query ? 10 : 0);
  } else {
    res.sendStatus(401);
  }
});
// get user stats
Router.get("/stats", verifyToken, (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  if (req.user.isAdmin) {
    User.aggregate(
      [
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ],
      (err, data) => {
        if (err) {
          res.json({ usersRouteGETAll: err.message });
          console.log(err);
        } else res.json(data);
      }
    );
  } else {
    res.sendStatus(401);
  }
});

module.exports = Router;
