const mongoose = require('mongoose')
const debug = require('debug')('app:schema');

const userSchema = new mongoose.Schema({
    userName: String,
    id_3: Number,
    email: String,
    password: String,
});


const User = mongoose.model("User", userSchema);


module.exports = User;
