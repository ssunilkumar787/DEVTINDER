const { mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Vercel-Admin-atlas-lightBlue-lamp:Siremi%402001@atlas-lightblue-lamp.bbht8u3.mongodb.net/devTinder",
  );
};

module.exports = connectDB
