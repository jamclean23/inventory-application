// Controller for database queries


// ====== IMPORTS ======

const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');

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
            $project: {
                name: {
                    $concat: [
                      { $toUpper: { $substrCP: ["$name", 0, 1] } },
                      { $substrCP: ["$name", 1, { $subtract: [{ $strLenCP: "$name" }, 1] } ] }
                    ]
                },
                "price": 1,
                "description": 1,
                "category": 1,
                "country_of_origin": 1,
                "weight": 1,
                "stock": 1
            }
        },
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

async function findById (req, res) {
    const client = new MongoClient(process.env.MONGO_CONNECT);

    console.log('REMOVE REQUEST');
    console.log('ID: ' + req.get("id"));
    const cheeseId = new mongodb.ObjectId(req.get("id"));

    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');
        const result = await cheeses.findOne({"_id": cheeseId});
        res.status(200).send({result: result});
    } catch (err) {
        console.log(err);
        res.status(400).send({result: false});
    } finally {
        client.close();
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

    console.log('REMOVE REQUEST');
    console.log('ID: ' + req.get("id"));
    const cheeseId = new mongodb.ObjectId(req.get("id"));

    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');
        const result = await cheeses.deleteOne({"_id": cheeseId});
        res.status(200).send({result: true});
    } catch (err) {
        console.log(err);
        res.status(400).send({result: false});
    } finally {
        client.close();
    }
}

async function update (req, res) {
    console.log('UPDATE');
    const client = new MongoClient(process.env.MONGO_CONNECT);

    const cheeseId = new mongodb.ObjectId(req.get("id"));
    const fields = JSON.parse(req.get("fields"));

    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');
        await cheeses.updateOne(
            {
                "_id": cheeseId
            }, 
            {
                $set: {
                    "name": fields.name,
                    "description": fields.description,
                    "category": fields.category,
                    "country_of_origin": fields.region,
                    "weight": fields.weight,
                    "stock": fields.stock,
                    "price": fields.price
                }
        },
        {
            upsert: false
        });
        res.status(200).send({result: true});
    } catch (err) {
        console.log(err);
        res.status(400).send();
    } finally {
        client.close();
    }
}


// ====== EXPORTS ======

module.exports = {
    find,
    findById,
    add,
    remove,
    update
}