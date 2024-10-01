// userschema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    city: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
