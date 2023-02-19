/**
 * @desc Get All Bootcamps
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamps=(req,res,next)=>{
    res.status(200).json({success:true,"msg":`Display bootcamp with id Number ${req.params.id}`});

}