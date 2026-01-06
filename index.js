//STEPS TO WRITE THE PROGRAM

//1. Input the commands

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//2. Process the commands (parsing)
function parseCommands(args) {
    info = [];
    for (let i = 0; i < args.length; i++) {
        if (args[i].includes('--')) {
            const title = args[i].substring(2); //remove the '--' prefix
            const content = args[i + 1]; //next argument is the content
            if (Titles.some(t => title.includes(t))) {
                if (info[title] !== undefined) {
                    console.log(`Warning: Duplicate title "${title}" found. Overwriting previous content.`);
                    info[title] = content;
                    i++; //skip the next argument as it's already processed
                }
            } else {
                console.log(`Error: Invalid category "${title}". Title does not exist, would you like to add it?`);

            }
        }
    }
}

//3. Use commands to set a specific cases (valid and invalid)

function isCommands(cms) {
    const validCommands = ['add', 'update', 'delete', 'view', 'export'];
    if (validCommands.includes(cms)) {
        commandCases(cms);
    } else {
        console.log('Invalid command. Please use one of the following commands: add, update, delete, view, export.');
    }
}

//4. Make logic for each valid command
function commandCases(command){
    switch (command) {
        case 'add':
            console.log('What would you like to add? \n\n 1. Expense \n 2. Budget \n 3. Category');
             rl.question('Enter the number corresponding to your choice: ', (answer) => {
                const option = parseInt(answer, 10);
                addOptions(option);
                console.log('Adding a new item...');
                rl.close();
             });
            break;
        case 'update':
            console.log('Updating an item...');
            break;
        case 'delete':
            console.log('Deleting an item...');
            break;
        case 'view':
            console.log('Viewing items...');
            break;
        case 'export':
            console.log('Exporting items...');
            break;
    }
}

function addOptions(option) {
    switch (option) {
        case 1:
            console.log('Adding a new Expense...');
            break;
        case 2:
            console.log('Adding a new Budget...');
            break;
        case 3:
            console.log('Adding a new Category...');
            break;
    }
}

//6. Create main function to call other functions
function main() {
    console.log(
        `Welcome to the Personal Finance Manager! 

        Here are the available commands: 
        add
        update 
        delete 
        view 
        export`
    );
    const args = process.argv.slice(2); //slice to remove first two default arguments
    const command = args[0];
    const Titles = ['Description', 'Amount'];
    isCommands(command);
    parseCommands(args);
}