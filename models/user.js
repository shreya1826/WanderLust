const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// passport will automatically provide username and password to the user.
const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
});


userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);