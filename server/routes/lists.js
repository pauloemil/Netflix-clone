const Router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../middleWheres/verifyToken");

// create
Router.post("/", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    List.create(req.body, (err, list) => {
      if (err) res.json({ listRoutCreate1: err.message });
      else res.json(list);
    });
  } else {
    res.sendStatus(401);
  }
});

// delete
Router.delete("/:id", verifyToken, (req, res) => {
  if (req.user.isAdmin) {
    List.findByIdAndDelete(req.params.id, (err, deletedList) => {
      if (err) res.json({ movieRouteDELETE: err.message });
      else if (!deletedList) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

// get
Router.get("/", verifyToken, (req, res) => {
  const typeQ = req.query.type;
  const genreQ = req.query.genre;

  List.aggregate(
    [
      { $sample: { size: 10 } },
      {
        $match:
          typeQ && genreQ
            ? { type: typeQ, genre: genreQ }
            : typeQ
            ? { type: typeQ }
            : genreQ
            ? { genre: genreQ }
            : {},
      },
    ],
    (err, lists) => {
      if (err) res.json({ movieRouteGET: err.message });
      else res.json(lists);
    }
  );
});

module.exports = Router;
