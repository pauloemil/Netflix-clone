const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
  if (err) console.log("database config", err);
  else console.log("Connected Successfully");
});
