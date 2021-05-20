const MediaTypeError = require('../errors/MediaTypeError');
const multer = require('multer');
const path = require('path');
const Album = require('../entities/albums/models/Albums');

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
        '../../paper-dashboard-react/src/assets/img/entities/',
        dir);
      callback(null, uploadFolder);
    },
    filename: async (req, file, callback) => {
      const ext = path.extname(file.originalname);
      let filename = Date.now() + ext;
      if (method === 'updateUser') {
        if (req.user && req.user.image !== 'default-user-icon.png') {
          filename = req.user.image;
        }
      } else if (method === 'updateAlbum') {
        const albumID = req.params.id;
        const album = await Album.findByPk(albumID);
        if (album.image !== 'default-album-icon.png') {
          filename = album.image;
        }
      }
      callback(null, filename);
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
