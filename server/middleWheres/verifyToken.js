const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log("-" + token + "-");
  if (token) {
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        res.sendStatus(401);
        console.log("verifyMiddle", err.message);
      } else {
        // console.log(user);
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = verify;
