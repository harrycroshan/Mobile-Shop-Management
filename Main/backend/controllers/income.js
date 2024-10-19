const IncomeSchema = require("../models/incomeModel")
const nodemailer = require('nodemailer');

exports.addIncome = async (req, res) => {
    
    
    const {invoiceid, amount, category, email , date} = req.body

    
    const income = IncomeSchema({
        invoiceid,
        amount,
        category,
        email,
        date
    })

    

    try {

        if(!invoiceid || !category || !email || !date){
            return res.status(400).json({message : 'All fields are required!'})
        }  
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message : 'amount must be a positive Number'})
        }
        await income.save()
        sendmail(email,invoiceid,amount)
        res.status(200).json({message: 'Income Added'})
        
    } catch (error) {
        
        res.status(500).json({message: 'Server error'})
        
    }

    console.log(income)
    
    
}

exports.getIncomes = async (req, res) =>{

    try {

        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {

        res.status(500).json({message: 'Server Error'})
        
    }
}
exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    console.log(req.params);
    
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
 
}

exports.editIncome = async (req, res) => {
    const { id } = req.params; 
    const { invoiceid, amount, category, email, date } = req.body;

    try {
        if (!invoiceid || !category || !email || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id, 
            { invoiceid, amount, category, email, date }, 
            { new: true, runValidators: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income entry not found' });
        }

        res.status(200).json({ message: 'Income updated successfully', data: updatedIncome });

    } catch (error) {
     
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port: 465,
        auth:{
            user: 'lithiramalkith@gmail.com',
            pass: 'cwbb gcsf bgnc tkrr'

        }
    }

);

function sendmail(to,invoiceid,amount){

    transporter.sendMail({
        to:to,
        subject:"Payment Received Successfully",
        html:` 

      <p>Thank you for your recent order with Cellular World. We have received your payment and your Payment is confirmed.</p>

      <p>  Order Details:  </p>

      <ul>
        <li>Order Number: ${invoiceid}</li>
        <li>Total Amount: ${amount}</li>
        <li>Payment Status: Confirmed</li>
      </ul>
        <p>Thank you for shopping with us!</p>

      <p>Sincerely,</p>
      <p>Cellular World</p>
      `

    });
}


