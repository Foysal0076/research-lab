import ErrorResponse from "../utils/ErrorResponse.js"

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    //Mongoose bad objectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    //Duplicate error
    console.log(res.statusCode)

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message || 'Server error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }