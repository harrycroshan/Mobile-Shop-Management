import mongoose from 'mongoose';


const inquirieskSchema = new mongoose.Schema({
 

  id: {
    type: String,
    required: true
  },
  
  EmpId: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  inquire: {
    type: String, 
    required: true
  },
  
 
 
 
 

 
  
});


const Inquiries = mongoose.model('Inquiries', inquirieskSchema);

export default  Inquiries;