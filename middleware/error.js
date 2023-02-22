const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message=err.message

    //Mongoose bad ObjectID
    console.log(error.message.red)
    if(err.name=== 'CastError'){
        const message=`Please Enter a valid ID : This ID ${err.value} is not valid`;
        error= new ErrorResponse(message,404)
    }

    if(err.code===11000){
        const message=`Duplicate field value entered. Error Detail is : ${err}`;
        error = new ErrorResponse(message,400)

    }

    //Mongoose validation error
    if(err.name==='ValidationError'){
        const message= Object.values(err.errors).map(val=>val.message)
        error= new ErrorResponse(`Validation error : ${message}`, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;