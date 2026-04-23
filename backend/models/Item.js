const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
 name:String,
 description:String,
 type:String,
 location:String,
 date:String,
 contact:String,
 userId:String
});

module.exports = mongoose.model("Item", itemSchema);
