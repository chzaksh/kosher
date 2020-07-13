const mongoose = require('mongoose')
const debug = require('debug')('app:schema');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const aaa = new mongoose.Schema({
    firstName: String,
    mail: String,
    phpne: Number
})

const User = mongoose.model("User", userSchema);
const Aaaa =  mongoose.model("Aaaa", aaa);

module.exports = User;