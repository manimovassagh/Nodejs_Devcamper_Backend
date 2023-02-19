/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, "msg": `Get all Bootcamps !!`});

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
exports.createBootcamp = (req, res, next) => {
    res.status(201).json({success: true, "msg": "create new bootcamp"});
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

