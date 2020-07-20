const mongoose = require('mongoose')
const debug = require('debug')('app:schema');


const houseSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    textarea: String,
    phpne: Number,    
})


const House =  mongoose.model("adminHouse", houseSchema);


module.exports = House;