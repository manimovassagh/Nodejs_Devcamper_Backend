/**
 * @desc     sample logger to show the middleware functionality
 * @author   Mani Movassagh Ghazani
 * @param req
 * @param res
 * @param next
 */
const logger=(req,res,next)=>{
    res.special='mani'
    console.log('Some logger to show on request')
    next();
}

module.exports=logger;