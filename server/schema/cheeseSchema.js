// Schema for cheese objects


// ====== IMPORTS/SETUP ======

// Mongoose
const { Schema, model } = require('mongoose');


// ====== SCHEMA ======

const cheeseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country_of_origin: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
},
{
    collection: 'cheeses'
});

const CheeseModel = model('CheeseModel', cheeseSchema);

// ====== EXPORTS ======

module.exports = CheeseModel;