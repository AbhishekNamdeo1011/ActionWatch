const notFound = (req, res, next) => {

    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);

};

const errorHandler = (err, req, res, next) => {

    let statusCode =
        res.statusCode !== 200
            ? res.statusCode
            : err.statusCode || 500;

    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource id.";
    }

    if (
        err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError"
    ) {
        statusCode = 401;
    }

    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate key error.";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });

};

export {
    notFound,
    errorHandler,
};