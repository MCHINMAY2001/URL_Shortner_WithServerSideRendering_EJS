const express = require("express");
const app = express();
const PORT = 8000;
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const {dbConnection}  = require("./connection");
dbConnection("mongodb://localhost:27017/short-url");
app.use(express.json());

app.use("/url" , urlRoute);


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
res.redirect(entry.redirectUrl);
});


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT} `);
})