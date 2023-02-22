const bootcampRepository = require("../models/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await bootcampRepository.find();
    res.status(200).json({success: true, 'number of bootcamps': bootcamps.length, data: bootcamps});
});

/**
 * @desc    Get Single Bootcamp
 * @route   GET  /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcampByID = await bootcampRepository.findById(req.params.id);
    if (!bootcampByID) {
        return next(new ErrorResponse(`could not find any bootcamp from database with ID Number ${req.params.id}`, 404))
    }
    res.status(200).json({success: true, data: bootcampByID})

})

/**
 * @desc     Create new Bootcamp
 * @route    POST  /api/v1/bootcamps
 * @access   Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const createdBootcamp = await bootcampRepository.create(req.body);
    res.status(201).json({success: true, data: createdBootcamp});
});

/**
 * @desc     Update Bootcamp
 * @route    PUT  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const updatedBootcamp = await bootcampRepository.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedBootcamp) {
        return next(new ErrorResponse(`could not find any bootcamp for updating from database with ID Number ${req.params.id}`
            , 400))
    }
    res.status(200).json({
        success: true,
        message: `successfully updated the bootcamp with ID number ${req.params.id}`,
        data: updatedBootcamp
    })
});

/**
 * @desc     Delete Bootcamp
 * @route    DELETE  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const deletedBootcamp = await bootcampRepository.findByIdAndDelete(req.params.id);

    if (!deletedBootcamp) {
        return next(new ErrorResponse(`could not find any bootcamp for deleting from database with ID Number ${req.params.id}`
            , 400))
    }
    res.status(200).json({
        success: true,
        message: `successfully deleted the bootcamp with ID number ${req.params.id}`,
        data: {}
    })
})
