const multer = require('multer');
const path = require('path');
const MediaTypeError = require('../errors/MediaTypeError');

const allowedExtensions = ['png', 'jpg', 'jpeg'];

function checkFileExtension(file, callback) {
  const extension = path.extname(file.originalname);
  const isValidExtension =
    allowedExtensions.indexOf(extension.substring(1).toLowerCase()) !== -1;

  const isValidMimeType =
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg';

  if (isValidExtension && isValidMimeType) {
    callback(null, true);
  } else {
    callback(
      new MediaTypeError(`A extensão ${extension} não é válida!`), false);
  }
}

function storage(method, type) {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      let dir;
      if (type == 'album') {
        dir = 'albums';
      } else if (type == 'user') {
        dir = 'users';
      }
      const uploadFolder = path.resolve(
        __dirname,
        '../../paper-dashboard-react/src/assets/img/entities/' +
        dir);
      callback(null, uploadFolder);
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + ext;
      callback(null, filename);
      // Aqui entram os methods
    },
  });
};

const upload = (method, type) => {
  return multer({
    storage: storage(method, type),
    fileFilter: (req, file, callback) => {
      checkFileExtension(file, callback);
    },
  }).single('image');
};

module.exports = {upload};
