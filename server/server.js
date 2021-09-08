const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
require("./config/database");

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
