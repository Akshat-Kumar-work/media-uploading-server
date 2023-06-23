
const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;

const db_connect = ()=>{
    mongoose.connect(dbUrl ,{
        UseNewUrlParser:true,
        UseUnifiedTopology:true
    })
    .then ( ()=>{ console.log("db connected succesfully")})
    .catch((err)=>{console.log(err)})
}

module.exports = db_connect;