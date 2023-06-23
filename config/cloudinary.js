//importing cloudinary
const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try{
        //using config method of cloudinary to connect with server 
        //we have to pass 3 things in config method
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("cloudinary connected")
    }
    catch(err){
        console.log(err)
    }
}