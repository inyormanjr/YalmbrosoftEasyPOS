const { json } = require('express');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    console.log(err);
    error.message = err.message;
    console.log('Error Handler: ' + error | json);

    if (err.name === 'CastError') {
        const message = `Resource not found with Id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.name === 'ValidationError') {
        const message = Object.value(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};

 module.exports = errorHandler;