// userschema

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: String,
    city: String,
    age: Number,
    description: String,
    img: String,
    address: String,
  },
  {
    timestamps: true,
  }
);
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("Customer", customerSchema);
