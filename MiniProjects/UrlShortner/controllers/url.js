const shortid= require("shortid");
const URL = require("../models/url");

async function generateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});

    const shortId = shortid(8);
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.render('home',{id:shortId});
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const body = await URL.findOne({
        shortId
    });
    return res.json({noOfClicks : body.visitHistory.length, analytics:body.visitHistory})
}

module.exports = {
    generateNewShortUrl,
    getAnalytics
}