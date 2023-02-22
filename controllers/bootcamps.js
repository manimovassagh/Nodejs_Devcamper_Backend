const bootcampRepository = require("../models/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')
/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await bootcampRepository.find();
        res.status(200).json({success: true, 'number of bootcamps': bootcamps.length, data: bootcamps});
    } catch (error) {
        // res.status(400).json({success: false, message: 'could not fetch any bootcamp from database'})
       // next(new ErrorResponse(`could not fetch Bootcamps from Database : ${error.message}`, 404));
        next(error)
    }

};

/**
 * @desc    Get Single Bootcamp
 * @route   GET  /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = async (req, res, next) => {

    try {
        const bootcampByID = await bootcampRepository.findById(req.params.id);
        if (!bootcampByID) {
            return next(new ErrorResponse(`could not find any bootcamp from database with ID Number ${req.params.id}`, 404))
        }
        res.status(200).json({success: true, data: bootcampByID})

    } catch (error) {
        //next(new ErrorResponse(`Bad Request: Please Enter a valid ID`, 404))
        next(error)
    }
};

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
        console.log(`Error in Creating a new Bootcamp:  ${error.message}`.red.bold);
        next(error)
    }

};

/**
 * @desc     Update Bootcamp
 * @route    PUT  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.updateBootcamp = async (req, res, next) => {

    try {
        const updatedBootcamp = await bootcampRepository.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedBootcamp) {
           return  next(new ErrorResponse(`could not find any bootcamp for updating from database with ID Number ${req.params.id}`
                , 400))
        }
        res.status(200).json({
            success: true,
            message: `successfully updated the bootcamp with ID number ${req.params.id}`,
            data: updatedBootcamp
        })
    } catch (error) {
        //next(ErrorResponse(`Error occurred  ${req.params.id}`,400))
        next(error)
    }

};

/**
 * @desc     Delete Bootcamp
 * @route    DELETE  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.deleteBootcamp = async (req, res, next) => {

    try {
        const deletedBootcamp = await bootcampRepository.findByIdAndDelete(req.params.id);

        if (!deletedBootcamp) {
       return  next(new ErrorResponse(`could not find any bootcamp for deleting from database with ID Number ${req.params.id}`
       ,400))
        }
        res.status(200).json({
            success: true,
            message: `successfully deleted the bootcamp with ID number ${req.params.id}`,
            data: {}
        })
    } catch (error) {
        next(error)
    }
};
