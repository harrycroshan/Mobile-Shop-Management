const ExpenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {invoiceid, amount, category, email, date}  = req.body

    const income = ExpenseSchema({
        invoiceid,
        amount,
        category,
        email,
        date
    })

    try {
        //validations
        if(!invoiceid || !category || !email || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.editExpense = async (req, res) => {
    const { id } = req.params; 
    const { invoiceid, amount, category, email, date } = req.body;

    try {
        if (!invoiceid || !category || !date || !email) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id, 
            { invoiceid, amount, category, email, date }, 
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense entry not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully', data: updatedExpense });

    } catch (error) {
     
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};