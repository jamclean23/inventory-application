// Generates inventory of cheeses for inventory application project using chat gpt

// ====== IMPORTS/SETUP ======


const path = require('path');

// Environment Vars

require('dotenv').config({ path: path.join(__dirname, '../config/.env')});
console.log(process.env.OPENAI_KEY);

// OpenAi

const OpenAi = require('openai');
const openai = new OpenAi({apiKey: process.env.OPENAI_KEY});


// ====== MAIN ======

main();

// ====== FUNCTIONS ======

function main () {
    console.log('****** GENERATING CHEESES ******');
    makeRequest('Say this is a test');
}

async function makeRequest(request) {

    if (request) {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: request }],
            model: 'gpt-3.5-turbo',
        });
        
        console.log(chatCompletion.choices[0].message.content);
    } else {
        console.log('Please provide a request');
    }
}