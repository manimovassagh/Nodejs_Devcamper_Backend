const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

//Include other resources routers
const courseRouter = require("../routes/courses");

const router = express.Router();

router.use("/:bootcamps/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

/**
 * @description routes that need no parameters
 * @author Mani Movassagh
 */
router.route("/").get(getBootcamps).post(createBootcamp);

/**
 * @description routes with ID parameter
 * @author Mani Movassagh
 */
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
module.exports = router;
