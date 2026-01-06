const express = require('express');
const { loadExpenses, saveExpenses } = require('./expenseService');
const app = express(); //create an express application
const PORT = 3000; //define a port

app.use(express.json()); //middleware to parse JSON bodies

let expenses = loadExpenses(); //in-memory array to store expenses
let idCounter = 0; //simple id counter

app.get('/expenses', (req, res) => {
    res.json(expenses); //return all expenses
});

app.post('/expenses', (req, res) => {
    const data = req.body; //req.body is the data sent by client

    if(Array.isArray(data)){
        const addedList = []; //just to send as json response
        data.forEach(e => {
        const {description, amount} = e;
        const newExpense = { 
            id: ++idCounter,
            description: description,
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0]
        };
        expenses.push(newExpense); //add new expense to the array
        addedList.push(newExpense)
        });
        try {
            saveExpenses(expenses);
            res.json({message: 'Expenses were successfully added.', expense: addedList});
        } catch (error) {
            console.error('Error in POST endpoint:', error);
            res.status(500).json({ error: 'Failed to save' });
        }
    }
    else {
        const {description, amount} = data;
        const newExpense = { 
            id: ++idCounter,
            description: description,
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0]
        };
        expenses.push(newExpense); //add new expense to the array
        try {
            saveExpenses(expenses);
            res.json({message: 'Expense was successfully added.', expense: newExpense});
        } catch (error) {
            console.error('Error in POST endpoint:', error);
            res.status(500).json({ error: 'Failed to save' });
        }
    }

});

app.delete('/expenses/:id', (req, res) => {
    const expenseID = parseInt(req.params.id, 10);
    if (!expenses.some(e => e.id === expenseID)) //some is slightly better than find because we don't need to directly use the element
        return res.status(404).json({message: `Expense with ID ${expenseID} not found.`});
    expenses = expenses.filter(e => e.id !== expenseID); //returns every expense except the one to delete
    try {
        saveExpenses(expenses);
        res.json({message: `Expense with ID ${expenseID} was successfully deleted.`});  
    } catch (error) {
        console.error('Error in DELETE endpoint:', error);
        res.status(500).json({ error: 'Failed to save' });
    }
          
});

app.get('/expenses/summary', (req, res) => {
    //sum is accumulator and expense is current value, sum starting from value 0
    const total = parseFloat(expenses.reduce((sum, expense) => sum + expense.amount, 0));
    res.json({message: `Total expense is ${total}`});
});

app.patch('/expenses/:id', (req, res) => {
    const updateID = parseInt(req.params.id);
    const updatedExpense = expenses.find(e => e.id === updateID); //find is better because it directly returns the element, we will use it
    if (!updatedExpense)
        return res.status(404).json({message: `Expense with ID ${updateID} not found.`});
    const updatedData = req.body;
    updatedData.description == null ? void 0 : updatedExpense.description = updatedData.description;
    updatedData.amount == null ? void 0 : updatedExpense.amount = parseFloat(updatedData.amount);
    try {
        saveExpenses(expenses);
        res.json({message: 'new values updated', expense:updatedExpense});
    } catch (error) {
        console.error('Error in UPDATE/PATCH endpoint:', error);
        res.status(500).json({ error: 'Failed to save' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});