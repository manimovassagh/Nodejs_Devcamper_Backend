const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

/*
 * @desc    Get All courses
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/bootcamps/:bootcampId/courses
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
