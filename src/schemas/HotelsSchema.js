const mongoose = require('mongoose')
const debug = require('debug')('app:schema');


const hotelsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    textarea: String,
    phpne: Number,    
})


const Hotel =  mongoose.model("adminHotel", hotelsSchema);


module.exports = Hotel;