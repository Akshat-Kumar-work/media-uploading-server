const express = require("express");
const server = express();

require("dotenv").config();
const port = process.env.PORT;

//middleware to parse the json object
server.use(express.json());

//express-fileupload is a middleware to upload files to server into temp file and then upload it to media server which is cloudinary and delete file from server
// because express can only interact with js objects, so we need to parse the file
const fileUploadMiddleware = require("express-fileupload");
//server.use(fileUploadMiddleware())
server.use(fileUploadMiddleware(
    {
        useTempFiles:true,
        tempFileDir: "/tmp"
    }
))


const mediaRoutes = require("./routes/mainRoutes");
server.use("/api/v1",mediaRoutes);



const db_connect  = require("./config/db");
 db_connect()

const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect()

server.listen(port , ()=>{
    console.log("server is ON");
})

