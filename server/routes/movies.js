const Router = require("express").Router();
const Movie = require("../models/Movie");
const verifyToken = require("../middleWheres/verifyToken");

// create
Router.post("/", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    Movie.create(req.body, (err, movie) => {
      if (err) res.json({ moviesRoutCreate: err.message });
      else res.json(movie);
    });
  } else {
    res.sendStatus(401);
  }
});

// update
Router.put("/:id", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, //to do: make specific columns for security reasons!
      { new: true },
      (err, updatedMovie) => {
        if (err) res.json({ moviesRouteUpdate: err.message });
        else if (!updatedMovie) res.sendStatus(404);
        else res.json(updatedMovie);
      }
    );
  } else {
    res.sendStatus(401);
  }
});

// delete
Router.delete("/:id", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
      if (err) res.json({ movieRouteDELETE: err.message });
      else if (!deletedMovie) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

// get
Router.get("/find/:id", verifyToken, (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) res.json({ movieRouteGET: err.message });
    else if (!movie) res.sendStatus(404);
    else res.json(movie);
  });
});

// get all
Router.get("/", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    Movie.find({}, (err, movies) => {
      if (err) res.json({ movieRouteGETAll: err.message });
      else res.json(movies.reverse());
    });
  } else {
    res.sendStatus(401);
  }
});

// get random  ?type=series
Router.get("/random", verifyToken, (req, res) => {
  const type = req.query.type;
  Movie.aggregate(
    [
      { $match: { isSeries: type === "series" ? true : false } },
      { $sample: { size: 1 } },
    ],
    (err, movie) => {
      if (err) res.json({ movieRouteGETAll: err.message });
      else if (!movie) res.sendStatus(404);
      else res.json(movie);
    }
  );
});

module.exports = Router;
