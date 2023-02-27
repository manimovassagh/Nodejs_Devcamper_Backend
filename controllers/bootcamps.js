const bootcampRepository = require("../models/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geoCoder = require("../utils/geocoder");
const Bootcamp = require('../models/Bootcamp')
/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    console.log(req.query)
    let query;
    let queryStr = JSON.stringify(req.query)
    // queryStr=queryStr.replace(/\b(gt|g|gte|lt|lte|in)/\b/g , match => `$${match}`);
    queryStr = queryStr.replace(/"lte"/g, '"$lte"');
    query = Bootcamp.find(JSON.parse(queryStr))
    //const bootcamps = await bootcampRepository.find();
    const bootcamps = await query;
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


/**
 * @desc     Get Bootcamp within the radius
 * @route    DELETE  /api/v1/bootcamps/radius/:zipcode/:distance
 * @access   Private
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {

    const {zipcode, distance} = req.params;
    //Get the lat/lng from geocoder
    const loc = await geoCoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    //calc radius using radians
    //Divide distance by radius of Earth
    // Radius= 3,963 mi / 6,378 km
    const radius = distance / 3963
    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}
    })
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,

    })

});
