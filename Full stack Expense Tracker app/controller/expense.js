const Expense=require('../models/expense')

exports.postAddExpense=(req,res,next)=>{
  const expenseamount=req.body.expenseamount;
  const description=req.body.description;
  const category=req.body.category;
  Expense.create({
    expenseamount:expenseamount,
    description:description,
    category:category
  })
  .then((result)=>{
    console.log(result)
    res.json(result)
  })
    
}

exports.getExpenses=(req,res,next)=>{
    Expense.findAll()
    .then((result)=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.deleteExpense=(req,res,next)=>{
    const expenseId=req.params.expenseId;
   
    Expense.findByPk(expenseId)
    .then((expense)=>{
       
        expense.destroy();
    })
    .then(()=>{
        res.json({})
    })
}

exports.putEditExpense=(req,res,next)=>{
   const expenseId=req.params.expenseId;
    
   const expenseamount=req.body.expenseamount;
  const description=req.body.description;
  const category=req.body.category;
   
    Expense.findByPk(expenseId)
    .then(expense=>{
        expense.expenseamount=expenseamount;
        expense.description=description;
        expense.category=category;
        return expense.save();
    })
    .then(()=>{
        res.json({})
    })

}