const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
/*
 * @desc    Get All courses
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/bootcamps/:bootcampId/courses
 * @access  Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

/*
 * @desc    Get single courses
 * @route   GET /api/v1/courses/:id
 * @access  Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  // console.log((await Course.find()).length);
  let query;
  console.log(req.params);
  if (req.params.bootcamps) {
    query = Course.find({ bootcamp: req.params.bootcamps });
    console.log("Bootcamp ID found");
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const course = await query;
  res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});

/*
 * @desc    add single courses
 * @route   POST /api/v1/bootcamps/:bootcampId/courses
 * @access  Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
  console.log(req.parmas);
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No response with the id of ${req.params.id}`),
      404
    );
  }

  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course,
  });
});
