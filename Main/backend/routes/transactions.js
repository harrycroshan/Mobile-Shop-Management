const { addExpense, getExpense, deleteExpense, editExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, editIncome } = require('../controllers/income');


const router = require('express').Router()



router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/put-income/:id', editIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/put-expense/:id', editExpense)

module.exports = router