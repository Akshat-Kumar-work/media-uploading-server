const mongoose = require("mongoose");

//nodemailer ko import kar rhe hai
const nodemailer = require("nodemailer");

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    fileUrl:{
        type:String

    },
    tag:{
        type:String

    }
})

//just db entry save or create krne k baad kuch kaam karwana hai toh post middleware ka use krty hai
//doc is the current saved or create file entry in db
    fileSchema.post( "save", async function(doc){
        try{
            console.log("doc",doc)

            //create transporter using nodemailer
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass : process.env.MAIL_PASS
                }
            })

            //send mail
            let info = await  transporter.sendMail({
                from: "akshatCoder",
                to:  doc.email,
                subject:  "file uploaded to cloudinary",
                html: `<h2>hello ji </h2> <p>file uploaded successfully View here: <a href="${doc.fileUrl}"> ${doc.fileUrl}</a> </p> `
            })

            console.log(info)


        }
        catch(err){
            console.log(err)
        }
    })

 module.exports = mongoose.model("File",fileSchema);