const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//this will automatically add username,password
// and all and make sure that user name is unique and hash it ad etc
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
