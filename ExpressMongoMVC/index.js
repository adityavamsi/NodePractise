const express = require("express");
const {connectDatabase} = require("./connection");
const {logResReq} = require("./middlewares/logs");
const userRouter = require("./routes/user");
const app = express();
app.use(logResReq());
app.use(express.urlencoded({extended:false}));

connectDatabase("mongodb://127.0.0.1:27017/EmployeeData");

app.use('/users',userRouter);


app.listen(5000,()=> console.log("Running on port : 5000"));