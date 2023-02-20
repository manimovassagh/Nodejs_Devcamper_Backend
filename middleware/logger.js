const { getBootcamp } = require("../controllers/bootcamps");

/**
 * @desc     sample logger to show the middleware functionality
 * @author   Mani Movassagh Ghazani
 * @param req
 * @param res
 * @param next
 */
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.url}`);
  console.log(req);
  next();
};

module.exports = logger;
