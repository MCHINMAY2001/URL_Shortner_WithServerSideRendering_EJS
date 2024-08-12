const URL = require("../models/url");
const shortid = require("shortid");


async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "URL is required"});
    } 
     const shortID = shortid();
     await URL.create({
        shortId :shortID,
        redirectUrl:body.url,
        visitHistory:[]
     });
     return  res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result =await URL.findOne({shortId});
    if(!result){
        return res.status(404).json({error:"Url Doesnot exist in the database or please check the shorturl again"});
    }
    return res.json({totalClicks:result.visitHistory.length , analytics:result.visitHistory})
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics
}