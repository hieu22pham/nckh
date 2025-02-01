const express = require('express')
const router = express.Router();
const controller = require("../controller/ModelList.controler")

router.get('/getData', controller.getProcTime);
router.put('/updateData', controller.updateProcTime);


module.exports = router;