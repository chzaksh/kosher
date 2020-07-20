const mongoose = require('mongoose')
const debug = require('debug')('app:schema');


const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    textarea: String,
    phpne: Number,    
})


const Contact =  mongoose.model("adminContact", contactSchema);


module.exports = Contact;