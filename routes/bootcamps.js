const express = require('express')
const {getBootcamps, getBootcamp, createBootcamp, editBootcamp, deleteBootcamp} = require("../controllers/bootcamps");
const router = express.Router();

router.get('/', getBootcamps)
router.get('/:id', getBootcamp)
router.post('/', createBootcamp)
router.put('/:id', editBootcamp)
router.delete('/:id', deleteBootcamp)

module.exports = router;