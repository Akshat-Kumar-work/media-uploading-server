const cloudinary = require("cloudinary").v2;
const File = require("../models/file");

exports.videoUpload = async(req, res)=>{
    
   try{
     //fetch info data
     const {name , email , tag} = req.body;

     //fetch video
     const file = req.files.videofile;
 
     const fileTypeSupported = [ "mov" , "mp4"]
     const currentFileType = file.name.split(".")[1];
 
     //agar file type support nahi karta
     if(!fileTypeSupported.includes(currentFileType)){
         return res.status(400).json({
             success:false,
             message:"file type not supported"
         })
     }
 
     const options = {folder:"mediaServer"};
     options.resource_type = "auto";
     //agar support karta hai toh cloudinary par upload krdo
     const response =  await cloudinary.uploader.upload(file.tempFilePath , options);
    
     //db m entry create krdo
     const filedata = await File.create({ name , email , tag , fileUrl:response.secure_url})
     
     res.status(200).json({
        success:true,
        message:"video uploaded succesfully"
     })
     
   }
   catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"unable to  uploaded video"
        })
   }


}