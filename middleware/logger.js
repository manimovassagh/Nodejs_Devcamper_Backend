const logger=(req,res,next)=>{
    res.special='mani'
    console.log('Some logger to show on request')
    next();
}

module.exports=logger;