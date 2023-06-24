

//local-file-upload function client sy data lkr server par upload krta hai
exports.localfileupload = async(req, res)=>{
    try{

        //fetching file from request, files folder hai usme file name ki key hai 
        //file jo send kari hai req m ,usko  hmesha files k andar se hi fetch kr skty hai
        const file = req.files.file ;
   
        //defining path of server to store file
        // __dirname means current directory in this controllers folder is current directory
        //controllers k andar files naam k folder k andar current date or time par
        //last m extension lagaya hai file m name k andar split kardo . k basis par aur 1st index ki value dedo
        let path = __dirname + "/files/" + Date.now() + `${file.name.split('.' [1])}`
        
        
        //file ko move karna hai ess path par , mv() it is used to move file
        file.mv(path , (err)=>{
            console.log(err)
        })
        res.json({
            success: true,
            message: "local file uploaded"
        })
    }
    catch(err){
        console.log(err)
    }
}