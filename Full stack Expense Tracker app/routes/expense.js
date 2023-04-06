const express=require('express');
 
const router=express.Router();

const expenseController=require('../controller/expense')

router.post('/expense',expenseController.postAddExpense)

router.get('/expense',expenseController.getExpenses)

router.delete('/expense/delete-expense/:expenseId',expenseController.deleteExpense)

router.put('/expense/edit-expense/:expenseId',expenseController.putEditExpense)

module.exports = router