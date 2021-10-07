const notFound = (req, res, next) => {
    const error = new Error('Not Found - 4(req.orginalUrl');
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Check whether status code is 200, then convert to 500, else res.status code
    res.status(statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '',
    });
}; 

module.exports = {
  notFound,
  errorHandler,
};

