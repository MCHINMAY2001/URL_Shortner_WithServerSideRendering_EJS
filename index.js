const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const {dbConnection}  = require("./connection");
dbConnection("mongodb://localhost:27017/short-url");
app.use(express.json());
//to encode to form data coming from the frontend
app.use(express.urlencoded({extended:false}));



app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use("/url" , urlRoute);
app.use("/" , staticRoute);
app.get("/:shortid",async (req,res)=>{
    const shortId = req.params.shortid;
 const entry = await URL.findOneAndUpdate(
      {
      shortId
  },
  {
      $push:{
      visitHistory:{
          timestamp : Date.now()
      },
  },
}
);
if(!entry){
  return res.status(404).json({error:"Url Doesnot exist in the database or please check the shorturl again"});
}
res.redirect(entry.redirectUrl);
});

// app.get("/url/test",async (req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
// });


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT} `);
})