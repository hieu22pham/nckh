const express = require('express')
const router = express.Router();
const controller = require("../controller/ModelList.controler")

router.get('/getData', controller.getProcTime);
router.put('/updateData', controller.updateProcTime);

router.get('/getAllData', controller.getAllData);
router.put('/updateNumberProcessed', controller.updateNumberProcessed);
router.put('/updateNumberFailed', controller.updateNumberFailed);
router.put('/updateNumberProcessedTo0', controller.updateNumberProcessedTo0);
router.put('/resetNumberProcessed', controller.resetNumberProcessed);

module.exports = router;