const AlbumService = require('../services/AlbumService');
const UserService = require('../../users/services/UserService');
const router = require('express').Router();
const {
  jwtMiddleware,
  checkRole,
  checkDataBelongsToUser,
} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');
const CustomerMusicService = require(
  '../../users/services/CustomerMusicService');

router.use(jwtMiddleware);

// Criar album vazio
router.post('/',
  checkRole(['artist']),
  upload('createAlbum', 'album'),
  async (req, res, next) => {
    try {
      const newAlbum = req.body;
      const authorId = req.user.id;
      newAlbum.image = req.file ? req.file.filename : 'default-album-icon.png';
      newAlbum.releaseDate = new Date().getDay(); // Na prática virá na
      // requisição
      const createdAlbum = await AlbumService.createAlbum(newAlbum);
      const author = await UserService.getUser(authorId);
      createdAlbum.setAuthor(author);
      resObject = {
        addMusic_URL: {
          method: 'POST',
          href: `localhost:3000/musics/${createdAlbum.id}`,
        },
        album: createdAlbum,
      };
      res.status(201).json(resObject);
    } catch (error) {
      next(error);
    }
  },
);

// Comprar album
router.post('/store/:id',
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const albumId = req.params.id;
      // Pagamento
      CustomerMusicService.buyAlbum(userId, albumId);
      res.status(200).json('Compra realizada!');
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
  checkDataBelongsToUser('album'),
  upload('updateAlbum', 'album'),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const body = req.body;
      body.image = req.file ? req.file.filename : undefined;
      const albumId = req.params.id;
      await AlbumService.updateAlbumInfo(albumId, body);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },
);

// Deletar album e consequentemente todas as suas músicas
router.delete(
  '/:id',
  checkRole(['artist']),
  checkDataBelongsToUser('album'),
  async (req, res, next) => {
    try {
      const albumId = req.params.id;
      await AlbumService.deleteAlbum(albumId);
      res.status(200).json('Álbum deletado com sucesso!');
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/admin/:id',
  checkRole(['artist', 'admin']),
  async (req, res, next) => {
    try {
      const albumId = req.params.id;
      await AlbumService.deleteAlbum(albumId);
      res.status(200).json('Álbum deletado com sucesso!');
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
