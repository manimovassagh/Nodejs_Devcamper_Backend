

/**
 * @desc Get All Bootcamps
 */
exports.getBootcamps=(req,res,next)=>{
    res.status(200).json({success:true,"msg":`Get all Bootcamps !!`});

}
/**
 * @desc Get Bootcamp
 */
exports.getBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,"msg":`Display bootcamp with id Number ${req.params.id}`});

}
/**
 * @desc Create Bootcamp
 */
exports.createBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,"msg":"create new bootcamp"});
}
/**
 * @desc Edit Bootcamp
 */
exports.editBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,"msg":`Edit bootcamp with id Number ${req.params.id}`});

}
/**
 * @desc Delete Bootcamp
 */
exports.deleteBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,"msg":`Delete bootcamp with id Number ${req.params.id}`});

}

