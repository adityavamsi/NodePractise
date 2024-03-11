const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require('mongoose');
const app = express();
const PORT = 7000;


mongoose.connect("mongodb://127.0.0.1:27017/UsersData")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Mongo Error : ",err));
//middleware - (plugin)
app.use(express.urlencoded({extended:false}));
app.get("/api/users",(req,res)=>{
    
    res.json(users);
});

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('user',userSchema);

app.route("/api/users/:id")
    .get(async(req,res)=>{
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.json(user);
    })
    .patch(async(req,res)=>{
        // const userId = Number(req.params.id);
        // const originalUser = users.find((user)=> user.id===userId);
        // const ind = users.indexOf(originalUser);
        // console.log(originalUser);
        // const modifiedUser = req.body;
        // //console.log(req.body);
        // if(modifiedUser.id){
        //     return res.json({status:"Error....U cant enter id "});
        // }
        // else{
            
        //     users[ind]={...modifiedUser,id:userId};
        //     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        //         console.log(users[ind]);
        //         return res.json({status:"success"});
        // })
        // }
        const body = req.body;
        await User.findByIdAndUpdate(req.params.id,body);
        return res.json({msg : "updated"});
         

    })
    .delete(async(req,res)=>{
        //Delete user using id
        // const userId = Number(req.params.id);
        // const user = users.find((user)=> user.id===userId);
        // const ind = users.indexOf(user);
        // users.splice(ind,1);
        // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),()=>{
        //     return res.json({status:"Successfully deleted"});
        // })
        await User.findByIdAndDelete(req.params.id);
        return res.json({msg:"deleted successfully.."});
        
       
    });
app.post("/api/users",async(req,res)=>{
    //Post a new user
    const body = req.body;
    //users.push({...body, id:users.length + 1});
    console.log(body);
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     console.log(body);
    // return res.json({status:"success"});
    // })

    const user = await User.create({
        // first_name:body.first_name,
        // last_name:body.last_name,
        // email:body.email,
        // gender:body.gender,
        // job_title:body.job_title
        ...body


    })
    console.log("USER",user);
    return res.status(201).json({msg:"success"});
    
})

app.get("/users",async(req,res)=>{
    const user = await User.find({});
    const html = `
    <h1>List of all Users</h1>
    <ul>
    ${user.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    
    `;
   res.send(html);
})

app.route("/users/:id")
    .get((req,res)=>{
        const userId = Number(req.params.id);
        const user = users.find((user)=> user.id===userId);
        const html = `
        <ul>
            <h3>${user.first_name}</h3>
        
        </ul>`;
        return res.send(html);
    })
    .patch((req,res)=>{
        //Edit user using id
        return res.json({status:"Pending"});
    })
    .delete((req,res)=>{
        //Delete user using id
        return res.json({status:"Pending"});
    });



app.listen(PORT,()=>console.log(`Running on port no: ${PORT}`));