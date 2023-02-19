const express = require('express')
const {getBootcamps, getBootcamp, createBootcamp, deleteBootcamp, updateBootcamp} = require("../controllers/bootcamps");
const router = express.Router();


/**
 * @description routes that need no parameters
 * @author Mani Movassagh
 */
router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

/**
 * @description routes with ID parameter
 * @author Mani Movassagh
 */
router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);
module.exports = router;