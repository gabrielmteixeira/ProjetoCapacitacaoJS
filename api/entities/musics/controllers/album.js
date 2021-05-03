const router = require('express').Router();
const AlbumService = require('../services/AlbumService');

// Criar album vazio ou criar album com várias músicas
router.post('/', async (req, res) => {
    try {
        console.log(req.body.album);
        console.log(req.body.musics);
        const newAlbum = req.body.album;
        newAlbum.releaseDate = new Date().getDay(); // Na prática virá na
        // requisição
        const createdAlbum = await AlbumService.createAlbum(newAlbum);
        if (req.body.musics.length > 0) {
            // Tem musica (adiciona ao album)
            for (music of req.body.musics) {
                createdAlbum.createMusic(music);
            }
        }
        res.status(200).json(createdAlbum);
    } catch (error) {
        console.log(error);
    }
});

// Pegar todas as músicas pertencentes a determinado album pelo id (do album)
router.get('/:id', async (req, res) => {
    const albumId = req.params.id;
    const album = await AlbumService.getAlbumById(albumId);
    const musics = await album.getMusics();
    res.status(200).json({...album.dataValues, musics});
});

// Deletar album e consequentemente todas as suas músicas
router.delete('/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await AlbumService.getAlbumById(albumId);
        await AlbumService.deleteAlbum(albumId);
        res.status(200).json(album);
    } catch (e) {
        console.log(error);
    }
});

// router.post('/music') => album/music -> criar a musica e ja
// adicionar num album existente
// router.get('/music') => album/music
// router.get('/music/:id') => album/music/:id
// router.put('/music/:id') =>  album/music/:id -> criar a musica e ja
// adicionar num album existente

module.exports = router;
