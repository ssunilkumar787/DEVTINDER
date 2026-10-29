const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user");
const { validateSinUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

// signup api
app.post("/signup", async (req, res) => {
  try {
    validateSinUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("User is added successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//login api
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credential!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid Credential!!")
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const UPDATES_ALLOWED = [
      "firstName",
      "lastName",
      "about",
      "age",
      "gender",
      "skills",
      "photoUrl",
    ];

    const isUpdateAllowed = Object.keys(data).every((val) =>
      UPDATES_ALLOWED.includes(val),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (data?.skills?.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    res.send("User Updated Successfully!");
  } catch (err) {
    res.status(400).send(err.message);
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
