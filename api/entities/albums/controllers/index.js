const router = require('express').Router();
const AlbumService = require('../services/AlbumService');

// Criar album vazio ou criar album com várias músicas
router.post('/', async (req, res, next) => {
  try {
    const newAlbum = req.body.album;
    newAlbum.releaseDate = new Date().getDay(); // Na prática virá na
    // requisição
    const createdAlbum = await AlbumService.createAlbum(newAlbum);
    res.status(201).json(createdAlbum);
  } catch (error) {
    next(error);
  }
});

// Pegar todas as músicas pertencentes a determinado album pelo id (do album)
router.get('/:id', async (req, res, next) => {
  try {
    const albumId = req.params.id;
    const album = await AlbumService.getAlbumById(albumId);
    const musics = await album.getMusics();
    res.status(200).json({...album.dataValues, musics});
  } catch (error) {
    next(error);
  }
});

// Pegar todos os albuns
router.get('/', async (req, res, next) => {
  try {
    const albums = await AlbumService.getAllAlbums();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const albumId = req.params.id;
    await AlbumService.updateAlbumInfo(albumId, body);
  } catch (error) {
    next(error);
  }
});

// Deletar album e consequentemente todas as suas músicas
router.delete('/:id', async (req, res, next) => {
  try {
    const albumId = req.params.id;
    const album = await AlbumService.getAlbumById(albumId);
    await AlbumService.deleteAlbum(albumId);
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
