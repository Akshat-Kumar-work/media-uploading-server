

const File = require("../models/file");
const cloudinary = require("cloudinary").v2;


//function to check the file type supported or not
const  fileTypeSupported = (type , supportedTypes)=>{
   return  supportedTypes.includes(type)
}


//function to upload file to cloudinary
async function uploadFileToCloudinary(file,folder){
    const options = {folder}
  return await cloudinary.uploader.upload(file.tempFilePath , options )
}


//this handler upload img on media server (cloudinary) and create entry in db 
exports.imageUpload = async(req, res)=>{
    try{

        //fetching data from req to  create entry in db
        const {name , tag , email} = req.body;
        //fetching img file from req files , to upload it to cloudinary
        const file = req.files.img;
        //validation for img supported type
        const supportedTypes = ['jpg','jpeg','png'];
        const currentFileType = `${file.name.split(".")[1]}`
        


        //agar file type supported nahi hai
        if( !fileTypeSupported(currentFileType , supportedTypes)){
            return res.json({
                success:false,
                message:"file format not supported"
            })
        }

        
        //agar file type supported hai, toh hum cloudinary par upload karengy , media-server is a folder name in which the images were going to upload
        const response = await uploadFileToCloudinary(file ,"mediaServer");
       
        //create entry in db
        const filedata = await File.create({
           name, tag, email , fileUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"image successfully uploaded"
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}