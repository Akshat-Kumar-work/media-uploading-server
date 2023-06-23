const express = require("express");
const router = express.Router();

//controllers
const {imageReduce} = require("../controllers/imageReduceUPload");
const {imageUpload} = require("../controllers/imageUpload");
const {localfileupload} = require("../controllers/localFileUpload");
const {videoUpload} = require("../controllers/videoUpload");



//paths
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageReduceUpload",imageReduce);
router.post("/localFileUpload",localfileupload);

module.exports = router;