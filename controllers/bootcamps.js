const bootcampRepository = require('../models/Bootcamp')
/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await bootcampRepository.find();
        res.status(200).json({success: true, data: bootcamps});
    } catch (error) {
        console.log(`Error in fetching list of bootcamps:  ${error.message}`.red.bold)
    }
    next()
}
/**
 * @desc    Get Single Bootcamp
 * @route   GET  /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, "msg": `Display bootcamp with id Number ${req.params.id}`});

}
/**
 * @desc     Create new Bootcamp
 * @route    POST  /api/v1/bootcamps
 * @access   Private
 */
exports.createBootcamp = async (req, res, next) => {
    try {
        const createdBootcamp = await bootcampRepository.create(req.body);
        res.status(201).json({success: true, data: createdBootcamp});
    } catch (error) {
        console.log(`Error in Creating a new Bootcamp:  ${error.message}`.red.bold)
    }
    next()
}
/**
 * @desc     Update Bootcamp
 * @route    PUT  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, "msg": `Edit bootcamp with id Number ${req.params.id}`});

}
/**
 * @desc     Delete Bootcamp
 * @route    DELETE  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, "msg": `Delete bootcamp with id Number ${req.params.id}`});

}

