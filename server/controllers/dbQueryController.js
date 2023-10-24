// Controller for database queries


// ====== IMPORTS ======

const { MongoClient } = require('mongodb');

require('dotenv').config();


// ====== FUNCTIONS ======

async function findAll(req, res) {
    const client = new MongoClient(process.env.MONGO_CONNECT);

    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');
        const cheeseArray = await cheeses.find().toArray();
        res.send(cheeseArray);
    } catch (err) {
        console.log(err);
        res.send({});
    } finally {
       await client.close();
    }
}


// ====== EXPORTS ======

module.exports = {
    findAll
}