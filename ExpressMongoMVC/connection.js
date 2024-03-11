const mongoose = require("mongoose");

async function connectDatabase(url){
    return mongoose.connect(url).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Connection Error : ",err));
}
module.exports = {connectDatabase};