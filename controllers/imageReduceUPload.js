const cloudinary = require("cloudinary").v2;
const File = require("../models/file")

exports.imageReduce = async(req, res)=>{
    
    try{
        //fetch data from req body
        const {name , tag , email} = req.body;

        //fetch img from req body
        const file = req.files.imgfile;

        //validations 
        const fileType = ["jpg" , "jpeg" , "png"];
        const currentFileType = file.name.split(".")[1];

        //agar support nai karta
        if(!fileType.includes(currentFileType)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        //agar type support karta hai
        //upload karo cloudinary par
        const response = await cloudinary.uploader.upload(file.tempFilePath, {folder : "mediaServer" , quality: "30"} );

        //db m enty create karo
        const dbinfo = await File.create({ name , email , tag , fileUrl:response.secure_url})

        res.status(200).json({
            success:true,
            message:"file uploaded successfully"
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"sorry something went wrong"
        })
    }
}