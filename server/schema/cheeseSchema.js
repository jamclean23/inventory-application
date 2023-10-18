// Schema for cheese objects


// ====== IMPORTS/SETUP ======

// Mongoose
const { Schema, model } = require('mongoose');


// ====== SCHEMA ======

const cheeseSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    country_of_origin: String,
    weight: Number,
    stock: Number
},
{
    collection: 'cheeses'
});

const CheeseModel = model('CheeseModel', cheeseSchema);

// ====== EXPORTS ======

module.exports = CheeseModel;