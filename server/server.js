require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const PORT = process.env.PORT || 3000;
require("./config/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing & Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
