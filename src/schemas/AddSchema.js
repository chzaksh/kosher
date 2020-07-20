const mongoose = require('mongoose')
const debug = require('debug')('app:schema');


const addSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    textarea: String,
    phpne: Number,    
})


const Add =  mongoose.model("adminAdd", addSchema);


module.exports = Add;