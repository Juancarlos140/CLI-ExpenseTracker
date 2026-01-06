const fs = require('fs');
const DATA_FILE = 'expenses.json';

function loadExpenses() {
    try { //try to read file
        const data = fs.readFileSync(DATA_FILE, 'utf-8'); //Sync is simpler for small apps, pauses entire program to be sure information's set
        return JSON.parse(data); //parses string into JSON, will not work if string format is off which will give error to catch
    } catch (error) { //if unable to read, return empty array
        return [];
    }
}

function saveExpenses(expenses) {
    try {
        const data = JSON.stringify(expenses, null, 2); //opposite of parsing, converts array to JSON format string
        fs.writeFileSync(DATA_FILE, data,'utf-8'); //destination, data, text format
        return true; //all good :)
    } catch (error) {
        console.error('CRITICAL, save errors are usually big problems, program might crash regardless of this catch:', error)
        throw error; //throw error again so it returns to user, use when error is unexpected/critical
        //could also do return false; gentler appraoach; allows more freedom but also more risky
    }
}

//export the functions
module.exports = { loadExpenses, saveExpenses };