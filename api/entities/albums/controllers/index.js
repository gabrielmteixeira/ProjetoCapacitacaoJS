const AlbumService = require('../services/AlbumService');
const router = require('express').Router();
const {
  jwtMiddleware,
  checkRole} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');

router.use(jwtMiddleware);

// Criar album vazio ou criar album com várias músicas
router.post('/',
  checkRole(['artist', 'admin']),
  upload('createAlbum', 'album'),
  async (req, res, next) => {
    try {
      const newAlbum = {
        author: req.body.author,
        name: req.body.name,
        image: req.file ? req.file.filename : 'default-album-icon.png',
        duration: req.body.duration,
        genre: req.body.genre,
        releaseDate: new Date().getDay(), // Na prática virá na
        // requisição
      };
      const createdAlbum = await AlbumService.createAlbum(newAlbum);
      res.status(201).json(createdAlbum);
    } catch (error) {
      next(error);
    }
  },
);

// Pegar todas as músicas pertencentes a determinado album pelo id (do album)
router.get('/:id',
  async (req, res, next) => {
    try {
      const albumId = req.params.id;
      const album = await AlbumService.getAlbumById(albumId);
      const musics = await album.getMusics();
      res.status(200).json({...album.dataValues, musics});
    } catch (error) {
      next(error);
    }
  },
);

// Pegar todos os albuns
router.get('/',
  async (req, res, next) => {
    try {
      const albums = await AlbumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/:id',
  checkRole(['artist']),
  upload('updateAlbum', 'album'),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const body = req.body;
      const albumId = req.params.id;
      await AlbumService.updateAlbumInfo(albumId, body);
    } catch (error) {
      next(error);
    }
  },
);

// Deletar album e consequentemente todas as suas músicas
router.delete('/:id',
  checkRole(['artist, admin']),
  async (req, res, next) => {
    try {
      const albumId = req.params.id;
      const album = await AlbumService.getAlbumById(albumId);
      await AlbumService.deleteAlbum(albumId);
      res.status(200).json(album);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
