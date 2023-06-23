const express = require("express");
const server = express();

require("dotenv").config();
const port = process.env.PORT;

server.use(express.json());

const mediaRoutes = require("./routes/mainRoutes");
server.use("/api/v1",mediaRoutes);

server.listen(port , ()=>{
    console.log("server is ON");
})

const db_connect  = require("./config/db")
db_connect();
