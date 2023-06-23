const express = require("express");
const router = express.Router();

router.get("/", ()=>{
    console.log("default route working well")
})

module.exports = router;