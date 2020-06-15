const mongoose = require('mongoose')
const debug = require('debug')('app:schema');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;