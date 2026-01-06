const express = require('express');
const app = express(); //create an express application
const PORT = 3000; //define a port

app.use(express.json()); //middleware to parse JSON bodies

let expenses = []; //in-memory array to store expenses

app.get('/expenses', (req, res) => {
    res.json(expenses); //return all expenses
});

app.post('/expenses', (req, res) => {
    const { description, amount } = req.body; //req.body is the data sent by client
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});