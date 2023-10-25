// Controller for database queries


// ====== IMPORTS ======

const { MongoClient } = require('mongodb');

require('dotenv').config();


// ====== FUNCTIONS ======

async function find(req, res) {

    let { sortBy, sortDirection, keyword } = JSON.parse(req.get("parameters"));

    if (sortBy === 'region') {
        sortBy = 'country_of_origin';
    }

    console.log(`SORTBY: ${sortBy}`);
    console.log(`SORTDIRECTION: ${sortDirection}`);
    console.log(`KEYWORD: ${keyword}`);

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

    console.dir(pipeline);

    try {
        const db = client.db('inventory');
        const cheeses = db.collection('cheeses');

        const cheeseArray = await cheeses.aggregate(pipeline).toArray();


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
    find
}