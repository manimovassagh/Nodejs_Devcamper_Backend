const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message=err.message
    //Log to console for developer
    console.log(err.stack.red)
    //Mongoose bad ObjectID

    if(err.name=== 'CastError'){
        const message=`Please Enter a valid ID : This ID ${err.value} is not valid`;
        error= new ErrorResponse(message,404)
    }
    console.log('Error name is : ',err.name)
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;