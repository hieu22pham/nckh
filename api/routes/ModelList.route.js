const express = require('express')
const router = express.Router();
const controller = require("../controller/ModelList.controler")

router.get('/getData', controller.getProcTime);
router.put('/updateData', controller.updateProcTime);

router.get('/getAllData', controller.getAllData);

module.exports = router;