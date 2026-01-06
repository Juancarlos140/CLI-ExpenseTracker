const express = require('express');
const app = express(); //create an express application
const PORT = 3000; //define a port

app.use(express.json()); //middleware to parse JSON bodies

let expenses = []; //in-memory array to store expenses
let idCounter = 0; //simple id counter

app.get('/expenses', (req, res) => {
    res.json(expenses); //return all expenses
});

app.post('/expenses', (req, res) => {
    const { description, amount } = req.body; //req.body is the data sent by client

    const newExpense = { 
        id: ++idCounter,
        description: description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0]



    };
    expenses.push(newExpense); //add new expense to the array
    res.json({message: 'Expense was successfully added.', expense: newExpense});
});

app.delete('/expenses/:id', (req, res) => {
    const expenseID = parseInt(req.params.id);
    expenses = expenses.filter(e => e.id !== expensesID); //returns every expense except the one to delete
    res.json({message: `Expense with ID ${expenseID} was successfully deleted.`});
    
});

app.get('/expenses/summary', (req, res) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({message: `Total expense is ${total}`});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});