const express = require("express");
const app = express();
const path = require("path");
const cookieParser  = require('cookie-parser');
const { checkForAuthentication,restrictTo } = require("./middlewares/auth");
const staticRoute =  require("./routes/staticRouter");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");

const { connectMongoDB } = require("./connect");
const URL = require("./models/url");
const PORT = 5001;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner")
.then(()=> console.log("MongoDB is connected"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/',staticRoute);
app.use('/url',restrictTo(["NORMAL"]),urlRoute);
app.use('/user',userRoute);


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