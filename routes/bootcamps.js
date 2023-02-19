const express = require('express')
const {getBootcamps, getBootcamp, createBootcamp, deleteBootcamp, updateBootcamp} = require("../controllers/bootcamps");
const router = express.Router();

router.get('/', getBootcamps)
router.get('/:id', getBootcamp)
router.post('/', createBootcamp)
router.put('/:id', updateBootcamp)
router.delete('/:id', deleteBootcamp)

module.exports = router;