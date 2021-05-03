const router = require('express').Router();
const MusicService = require('../services/MusicService');

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
        body = req.body;
        musicId = req.params.id;
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
        music = await MusicService.getMusicById(musicId);
        await MusicService.deleteMusic(musicId);

        res.status(200).json(music);
    } catch (e) {
        console.log(error);
    }
});

module.exports = router;
