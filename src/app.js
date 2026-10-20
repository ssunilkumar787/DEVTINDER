const express = require("express");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use("/user", userAuth);

app.get("/user", (req, res, next) => {
  res.send("hello from user");
});

app.listen("8888", () => {
  console.log("Server is listening on port 8888...");
});
