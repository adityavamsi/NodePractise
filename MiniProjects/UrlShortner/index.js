const express = require("express");
const app = express();
const path = require("path");
const statiRoute =  require("./routes/staticRouter");
const { connectMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const PORT = 5001;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner")
.then(()=> console.log("MongoDB is connected"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',statiRoute);
app.use('/url',urlRoute);
app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const body = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timeStamp:Date.now()
            }
        }
    });
    console.log(body);
    if(!body) return res.status(400).json({status:"invalid id"});
    return res.redirect(body.redirectURL);
})

app.listen(PORT,()=>console.log(`Running on port ${PORT}`));