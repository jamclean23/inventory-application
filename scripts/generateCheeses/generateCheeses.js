// Generates inventory of cheeses for inventory application project using chat gpt

// ====== IMPORTS/SETUP ======


const path = require('path');
const fs = require('fs');
const rdl = require('readline');
const showCursor = require('show-terminal-cursor');
const hideCursor = require('hide-terminal-cursor');

// Environment Vars

require('dotenv').config({ path: path.join(__dirname, '../../config/.env')});

// OpenAi

const OpenAi = require('openai');


// ====== MAIN ======

main();

// ====== FUNCTIONS ======

async function main () {
  // Run cheese generation and pass it the spinner
    const results = await cheeseGenerator(100);
    writeCheeseResults(results);
}

function writeCheeseResults (results) {
    fs.writeFile(path.join(__dirname, 'cheeseResults.json'), results, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('\n\x1B[32mCheese results recorded to file.\x1B[37m\n');
        }
    })
}

async function testSleep () {
    return new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
}

async function cheeseGenerator (numOfCheeses) {
    return new Promise((resolve) => {
        asyncWrapper();
        async function asyncWrapper () {
            console.log('\n\x1B[33m****** CHEESE GENERATOR ******\x1B[37m');
            
            const openaiNames = new OpenAi({
                apiKey: process.env.OPENAI_KEY,
                timeout: 600 * 60000
            });
            
            const request = `generate a list of ${numOfCheeses} different cheeses. Each cheese should be unique. Do not repeat cheeses throughout the array. Do not use the same cheese twice in the array. Output should be an array of ${numOfCheeses} names in json format. Do not provide comments, only the json output.`;
            
            let cheeseNames = await makeRequest(request, openaiNames);
            cheeseNames = JSON.parse(cheeseNames);
            console.log('Cheese names:\n');
            console.log(cheeseNames);
            
            let result = [];
            
            for (let i = 0; i < cheeseNames.length; i++) {
                
                console.log(`\n********\n${i+1}/${cheeseNames.length}\n\x1B[33mCurrent Cheese: ${cheeseNames[i]}\x1B[37m`);

                const openaiCheese = new OpenAi({
                    apiKey: process.env.OPENAI_KEY,
                    timeout: 600 * 60000
                });

                const detailsRequest = `For the given cheese ${cheeseNames[i]}, return an object in json format with no comments that provides:
                name: (name of cheese)
                description: (a description of the cheese. Should be 4 to 6 sentences. Do not use double quotes  inside of the description.)
                category: (category of the cheese)
                price: (price per individual unit of cheese. Only include the dollar amount)
                country_of_origin: (country where the cheese was made)
                weight: (weight of each individual unit of cheese)
                stock: (a random number between 0 and 20).
                The response should always be in valid json format, even if unable to provide the requested information.`
                
                const details = await makeRequest(detailsRequest, openaiCheese);
                result.push(JSON.parse(details));
                console.log(JSON.parse(details));
                
            }
            return resolve(JSON.stringify(result));
        }
    });
}
    
async function makeRequest(request, openai) {
    return new Promise((resolve) => {
        asyncWrapper();
        async function asyncWrapper () {
            console.log('\nGenerating cheeses...\nThis could take a while.\nCtrl+C to cancel.');
            
            if (request) {
                const spinner = Spinner();
                spinner.start();
                
                const chatCompletion = await openai.chat.completions.create({
                    messages: [{ 
                        role: 'user', 
                        content: request,
                    }],
                    model: 'gpt-3.5-turbo',
                });
                
                console.log('Done.\n');
                
                spinner.stop();
                
                return resolve(chatCompletion.choices[0].message.content);
            } else {
                console.log('Please provide a request');
            }
        }        
    });
}

function Spinner () {
    
    // Interrupt listener. Resets cursor from spinner
    process.on('SIGINT', function() {
        console.log("\x1B[31m\nCancelled.\x1B[37m");

        showCursor();
        process.exit();
});

    async function start () {
        if (this.spin === false) {
            this.spin = true;
            cycle(this);
        } else {
            return;
        }
    }

    async function cycle (context) {
        hideCursor();
        process.stdout.write(`\x1b[33m${context.dots[context.index]}\x1b[37m`);
        rdl.cursorTo(process.stdout, 0);
        await sleep();
        if (context.spin) {
            context.index++;
            if (context.index > context.dots.length-1) {
                context.index = 0;
            }
            cycle(context);
        } else {
            context.index = 0;
        }
    }

    async function stop () {
        showCursor();
        this.spin = false;
    }

    async function sleep () {
        return new Promise((resolve) => {
            setTimeout(resolve, 100);
        });
    }

    return {
        dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        index: 0,
        spin: false,
        start,
        stop
    };
}