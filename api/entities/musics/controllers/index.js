const NotAuthorizedError = require('../../../errors/NotAuthorizedError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const CustomerMusicService = require(
  '../../users/services/CustomerMusicService');
const AlbumService = require('../../albums/services/AlbumService');
const MusicService = require('../services/MusicService');
const {
  jwtMiddleware,
  checkRole,
  checkDataBelongsToUser,
} = require('../../../middlewares/auth-middlewares');
const router = require('express').Router();

router.use(jwtMiddleware);

// Aceita uma ou várias músicas e as registra no album com o id passado no
// params
router.post('/:id',
  checkRole(['artist']),
  async (req, res, next) => {
    try {
      const albumId = req.params.id;
      const {musics} = req.body;
      if (musics.length > 0) {
        const album = await AlbumService.getAlbumById(albumId);
        for (music of musics) {
          music.image = album.image;
          music.authorId = album.authorId;
          music.genre = music.genre ? music.genre : album.genre;
          await album.createMusic(music);
        }
        res.status(201).json(musics);
      } else {
        throw new InvalidParamError(
          'É necessário pelo menos uma música a ser criada ' +
            'para a utilização dessa rota',
        );
      }
    } catch (error) {
      next(error);
    }
  },
);

// Comprar música
router.post('/store/:id',
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const musicId = req.params.id;
      CustomerMusicService.buyMusic(userId, musicId);
      res.status(200).json('Compra realizada!');
    } catch (error) {
      next(error);
    }
  },
);

// Requisição para escutar música
router.get('/listen/:id',
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const musicId = req.params.id;
      const haveMusic = await CustomerMusicService.checkHaveMusic(
        userId,
        musicId,
      );
      if (!haveMusic) {
        throw new NotAuthorizedError('Você não possui essa música');
      }
      const music = await MusicService.getMusicById(musicId);
      res.status(200).json(music);
    } catch (error) {
      next(error);
    }
  },
);

// Get all musics (n creio que vá ser utilizado)
router.get('/',
  async (req, res, next) => {
    try {
      const musics = await MusicService.getAllMusics();
      res.status(200).json(musics);
    } catch (error) {
      next(error);
    }
  },
);

// Edit música específica
router.patch('/:id',
  checkRole(['artist']),
  checkDataBelongsToUser('music'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const musicId = req.params.id;
      await MusicService.updateMusicInfo(musicId, body);
      res.status(200).json({...body, ...{id: musicId}});
    } catch (error) {
      next(error);
    }
  },
);

// Delete música específica
router.delete('/:id',
  checkRole(['artist', 'admin']),
  async (req, res, next) => {
    try {
      const musicId = req.params.id;
      const music = await MusicService.getMusicById(musicId);
      await MusicService.deleteMusic(musicId);
      res.status(200).json(music);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
