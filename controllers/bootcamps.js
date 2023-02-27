const bootcampRepository = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geoCoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");
/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  //create an array of fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  //Loop over remove fields and delete them from request query
  removeFields.forEach((param) => {
    delete reqQuery[param];
  });

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|g|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  query = query.skip(startIndex).limit(limit);
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  const bootcamps = await query;
  //pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  }

  res.status(200).json({
    success: true,
    "number of bootcamps": bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

/**
 * @desc    Get Single Bootcamp
 * @route   GET  /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampByID = await bootcampRepository.findById(req.params.id);
  if (!bootcampByID) {
    return next(
      new ErrorResponse(
        `could not find any bootcamp from database with ID Number ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcampByID });
});

/**
 * @desc     Create new Bootcamp
 * @route    POST  /api/v1/bootcamps
 * @access   Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const createdBootcamp = await bootcampRepository.create(req.body);
  res.status(201).json({ success: true, data: createdBootcamp });
});

/**
 * @desc     Update Bootcamp
 * @route    PUT  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const updatedBootcamp = await bootcampRepository.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedBootcamp) {
    return next(
      new ErrorResponse(
        `could not find any bootcamp for updating from database with ID Number ${req.params.id}`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    message: `successfully updated the bootcamp with ID number ${req.params.id}`,
    data: updatedBootcamp,
  });
});

/**
 * @desc     Delete Bootcamp
 * @route    DELETE  /api/v1/bootcamps/:id
 * @access   Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await bootcampRepository.findById(
    req.params.id
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `could not find any bootcamp for deleting from database with ID Number ${req.params.id}`,
        400
      )
    );
  }
  bootcamp.remove()
  res.status(200).json({
    success: true,
    message: `successfully deleted the bootcamp with ID number ${req.params.id}`,
    data: {},
  });
});

/**
 * @desc     Get Bootcamp within the radius
 * @route    DELETE  /api/v1/bootcamps/radius/:zipcode/:distance
 * @access   Private
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //Get the lat/lng from geocoder
  const loc = await geoCoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  //calc radius using radians
  //Divide distance by radius of Earth
  // Radius= 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
