const express=require("express")
const cors=require("cors")
const path = require("path");
const mongoose=require("mongoose")

const technicianRoutes = require('./routes/technician.route');
const expesnseRoutes = require('./routes/transactions')
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const supplierorderRoutes = require('./routes/supplierOrder');
const customerPurchases = require('./routes/customerPurchases');
const authRouter = require('./routes/authRoutes');
const employeeRouter = require("./routes/employees.js");
const leaveRouter = require("./routes/leaves.js");
const attendanceRouter = require("./routes/attendances.js");
const orderRouter =  require("./routes/orders.js")
const supplierRouter = require("./routes/supplier.js")


const app=express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/technician", technicianRoutes);
app.use('/api/v1',expesnseRoutes)
app.use('/api/auth', authRouter);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/supplierorder', supplierorderRoutes);
app.use('/api/customer-purchases', customerPurchases);
app.use("/employee",employeeRouter);
app.use("/leave",leaveRouter);
app.use("/attendance",attendanceRouter);
app.use("/order",orderRouter);
app.use("/supplier",supplierRouter);






const PORT=process.env.PORT||8020







mongoose.connect("mongodb+srv://repair:repair123@mobileshop.4ijyj.mongodb.net/repair_db?retryWrites=true&w=majority&appName=MobileShop")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

