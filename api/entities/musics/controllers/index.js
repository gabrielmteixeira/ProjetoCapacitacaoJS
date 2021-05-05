const router = require('express').Router();
const AlbumService = require('../../albums/services/AlbumService');
const MusicService = require('../services/MusicService');

// Aceita uma ou várias músicas e as registra no album com o id passado no
// params
router.post('/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const {musics} = req.body;
        if (musics.length > 0) {
            const album = await AlbumService.getAlbumById(albumId);
            for (music of musics) {
                await album.createMusic(music);
            }
            res.status(201).json(musics);
        } else {
            console.log('É necessário pelo menos uma música a ser criada ' +
            'para a utilização dessa rota');
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
    }
});

// Pegar música especifica pelo id
router.get('/:id', async (req, res) => {
    try {
        const music = await MusicService.getMusicById(req.params.id);

        res.status(200).json(music);
    } catch (error) {
        console.log(error);
    }
});

// Get all musics (n creio que vá ser utilizado)
router.get('/', async (req, res) => {
    try {
        const musics = await MusicService.getAllMusics();
        res.status(200).json(musics);
    } catch (error) {
        console.log(error);
    }
});

// Edit música específica
router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        const musicId = req.params.id;
        await MusicService.updateMusicInfo(musicId, body);

        res.status(200).json({...body, ...{id: musicId}});
    } catch (error) {
        console.log(error);
    }
});

// Delete música específica
router.delete('/:id', async (req, res) => {
    try {
        const musicId = req.params.id;
        const music = await MusicService.getMusicById(musicId);
        await MusicService.deleteMusic(musicId);

        res.status(200).json(music);
    } catch (e) {
        console.log(error);
    }
});

module.exports = router;
