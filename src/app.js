const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user");

app.use(express.json());

// signup api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User is added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: ", +err.message);
  }
});

// get user by emailID api
app.get("/user", async (req, res) => {
  try {
    const emailId = req.body.emailId;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// feed api - get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId)
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    console.log("user", user);
    res.send("User Updated Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update user by email
app.patch("/userById", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ emailId: emailId }, data);
    res.send("user updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");

    app.listen("8888", () => {
      console.log("Server is listening on port 8888...");
    });
  })
  .catch((err) => {
    console.log("Database can not connected..");
  });
