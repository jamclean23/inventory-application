// Controller for database queries


// ====== IMPORTS ======

const { MongoClient } = require('mongodb');

const mongoose = require('mongoose');

const CheeseModel = require('../schema/cheeseSchema.js');

require('dotenv').config();


// ====== FUNCTIONS ======

async function find (req, res) {

    let { sortBy, sortDirection, keyword } = JSON.parse(req.get("parameters"));

    if (sortBy === 'region') {
        sortBy = 'country_of_origin';
    }

    const client = new MongoClient(process.env.MONGO_CONNECT);

    const pipeline = [
        {
            $sort: { 
                [sortBy || 'name']: sortDirection === 'ascending' ? 1 : -1
            } 
        }
    ];

    const searchQuery = {
        $search: {
            index: "cheese_search_index",
            text: {
                query: keyword,
                path: {
                    wildcard: "*"
                }
            }
        }
    };
    
    if (keyword) {
        pipeline.unshift(searchQuery);
    }


    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');

        const cheeseArray = await cheeses.aggregate(pipeline).toArray();

        res.send(cheeseArray);
    } catch (err) {
        console.log(err);
        res.status(400).send({});
    } finally {
       await client.close();
    }
}

async function add (req, res) {
    const cheese = JSON.parse(req.get('fields'));

    console.log('CHEESE');
    console.log(cheese);

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_INVENTORY);
        const model = new CheeseModel({
            name: cheese.name,
            description: cheese.description,
            category: cheese.category,
            price: cheese.price,
            country_of_origin: cheese.region,
            weight: cheese.weight,
            stock: cheese.stock
        });

        await model.save();

        res.status(200).send({
            "docAdded": true
        });
    } catch (err) {
        res.status(400).send({
            "docAdded": false
        });
    } finally {
        mongoose.connection.close();
    }
}

async function remove (req, res) {
    const client = new MongoClient(process.env.MONGO_CONNECT);

    try {

    } catch (err) {
        res.status(400).send();
    } finally {
        client.close();
        res.status(400).send();
    }
}

async function update (req, res) {
    const client = new MongoClient(process.env.MONGO_CONNECT);

    try {

    } catch (err) {
        res.status(400).send();
    } finally {
        client.close();
        res.status(400).send();
    }
}


// ====== EXPORTS ======

module.exports = {
    find,
    add,
    remove,
    update
}