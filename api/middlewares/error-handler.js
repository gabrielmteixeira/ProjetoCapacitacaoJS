const {JsonWebTokenError} = require('jsonwebtoken');
const {MulterError} = require('multer');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const MediaTypeError = require('../errors/MediaTypeError');
const InvalidParamError = require('../errors/InvalidParamError');
const PasswordTokenError = require('../errors/PasswordTokenError');

function errorHandler(error, req, res, next) {
  let message = error.message;
  let status = 500; // Internal Server Error

  // implementar csrf e error referente a ele

  if (error instanceof JsonWebTokenError ||
    error instanceof NotAuthorizedError) {
    status = 403; // Forbidden
  }

  if (error instanceof MulterError) {
    status = 413; // Payload Too Large
    message = 'O arquivo não pode passar de 1MB!';
  }

  if (error instanceof MediaTypeError) {
    status = 415; // Unsupported Media Type
  }

  if (error instanceof InvalidParamError) {
    status = 400; // Bad Request
  }

  if (error instanceof PasswordTokenError) {
    status = 404; // Not Found
  }

  console.log(error);
  res.status(status).json(message);
}

module.exports = errorHandler;
