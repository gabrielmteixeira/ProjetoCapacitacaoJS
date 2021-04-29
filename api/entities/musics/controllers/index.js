const router = require('express').Router();
const MusicService = require('../services/MusicService');

router.get('/', async (req, res) => {
    try {
        const musics = MusicService.getAllMusics();

        res.status(200).json(musics);
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const newMusic = req.body.music;
        MusicService.createMusic(newMusic);

        res.status(200).json(newMusic);
    } catch (e) {
        console.log(e);
    }
});

router.put('/', async (req, res) => {
    try {
        alteredMusic = req.body.music;
        alteredMusicId = req.body.id;
        MusicService.alterMusic(alteredMusicId, alteredMusic);

        res.status(200).json({...alteredMusic, alteredMusicId});
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    // duvida se eh realmente assim (a ideia eh ser users/userid)
    try {
        const music = MusicService.getMusic(req.params.id);

        res.status(200).json(music);
    } catch (e) {
        console.log(e);
    }
});

router.delete('/', async (req, res) => {
    try {
        const musicId = req.body.id;
        music = MusicService.getMusic(musicId);
        MusicService.deleteMusic(musicId);

        res.status(200).json(music);
    } catch {
        (e) => console.log(e);
    }
});

module.exports = router;
