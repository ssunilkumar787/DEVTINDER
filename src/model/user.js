const { mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please give valid email: " + value);
        }
      },
    },

    password: {
      type: String,
          validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter Strong Password :" + value)
            }
        }
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate: {
        validator: function (value) {
          return ["male", "female", "other"].includes(value);
        },
        message: "Gender is not valid!",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQchi5sg7mUmbWbRUeVh1Mus0NYioqXle1nMqVk5dcUQ&s=10",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Please give proper url")
            }
        }
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
