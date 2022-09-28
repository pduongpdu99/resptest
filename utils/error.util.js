exports.responseErrorHandler = (error, cb) => {
  return cb(error);
};

exports.handleErrors = (res) => {
  return res.status(403).json({
    status: 403,
    message: "403 Forbidden",
  });
};

exports.handleNotFoundErrors = (res) => {
  return res.status(404).json({
    status: 404,
    message: "404 Not Found",
  });
};
