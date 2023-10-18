// Populate the mongodb database with cheese entries


// ====== IMPORTS/SETUP ======



// System
const path = require('path');

// Cheese file
const cheesesFile = require('../assets/cheeseResults.json');

// Environment variables
require('dotenv').config({ path: path.join(__dirname, '../../config/.env')});

// Mongoose
const mongoose = require('mongoose');

// Schema
const CheeseModel = require('../../server/schema/cheeseSchema.js');


// ====== MAIN ======

main().catch(handleError);


// ====== FUNCTIONS ======

async function main () {
    await uploadCheeses(formatCheeses(cheesesFile));
}

async function uploadCheeses (cheesesArray) {
    for (i = 0; i < cheesesArray.length; i++) {
        const cheese = cheesesArray[i];
        await addCheese(cheese);
    }
}

function formatCheeses (cheesesFile) {
    let arrayCopy = JSON.parse(JSON.stringify(cheesesFile));
    arrayCopy.forEach((cheese, index) => {
        // Price
        cheese.price = +cheese.price.replaceAll('$', '');

        // Weight

        // Convert to number of oz
        let numUnit = +cheese.weight.replaceAll(/\D/g, '');

        if (cheese.weight.includes('g') || cheese.weight.includes('gram')) {
            numUnit = gramsToOz(numUnit);
        } else if (cheese.weight.includes('pound')) {
            numUnit = lbsToOz(numUnit);
        } else {
            if (!(cheese.weight.includes('oz'))) {
                throw new Error(`Unknowns units: ${cheese.weight}`);
            }
        }

        cheese.weight = numUnit;

        // Stock
        // Confirm that stock is in number format
        cheese.stock = +cheese.stock;
    });

    return arrayCopy;

    function gramsToOz (weightInGrams) {
        return Math.round(weightInGrams * 0.035274 * 100)/100;
    }

    function lbsToOz (weightInLbs) {
        return Math.round(weightInLbs * 16 * 100)/100;
    }
}

async function addCheese (cheese) {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_INVENTORY);
        const model = new CheeseModel({
            name: cheese.name,
            description: cheese.description,
            category: cheese.category,
            price: cheese.price,
            country_of_origin: cheese.country_of_origin,
            weight: cheese.weight,
            stock: cheese.stock
        });
        await model.save();
        console.log(`${model.name} added to db.`);
    } finally {
        mongoose.connection.close();
    }
}

function handleError (err) {
    console.log(err);
}