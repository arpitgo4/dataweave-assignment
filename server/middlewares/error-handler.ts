
const errorHandler = (err, req, res, next) => {
    if (res.headersSent)
        return;

    res.status(404).json({
        errors: [
            { message: err.message }
        ]
    });
};


export default errorHandler;
