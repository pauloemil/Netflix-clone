require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/lists");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("./config/database");

let CLIENT_LINKS_LIST = [];
process.env.CLIENT_LINKS.split(", ").forEach((link) =>
  CLIENT_LINKS_LIST.push(link)
);
console.log(CLIENT_LINKS_LIST);
app.use(
  cors({
    origin: CLIENT_LINKS_LIST, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing & Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/list", listRouter);
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
