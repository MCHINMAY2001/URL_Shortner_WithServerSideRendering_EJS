const mongoose = require("mongoose");

const dbConnection = async (url)=> {

    await mongoose.connect(url).then(()=>{
        console.log("Connection is sucessful");
    }).catch((err=>{
        console.log("mongoose connection error: ",err);
    }))
}

module.exports = {
    dbConnection
}