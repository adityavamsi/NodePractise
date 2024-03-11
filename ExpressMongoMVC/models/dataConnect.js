const mongoose = require("mongoose");

const UserSchema  = new mongoose.Schema({
    first_name:{
        type:"string",
        required:"true"
    },
    last_name:{
        type:"string"
    },
    email:{
        type:"string",
        required:"true",
        unique:"true"
    },
    gender:{
        type:"string",
        required:"true"
    },
    job_title:{
        type:"string"
    }
});

const User = mongoose.model('employees',UserSchema);

module.exports = User;