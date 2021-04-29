const router = require('express').Router();
const UserService = require('../services/UserService');

router.get('/', (req, res) => {
    try {
        UserService.getUser(req.body.id);
        res.send(200);
    } catch {
        (e) => console.log(e);
    }
});

router.post('/', (req, res) => {
    try {
        UserService.createUser(req.body.user);
        res.sendStatus(200);
    } catch {
        (e) => console.log(e);
    }
});

router.put('/', (req, res) => {
    try {
        UserService.alterUser(req.body.id, req.body.user);
    } catch {
        (e) => console.log(e);
    }
});

router.delete('/', (req, res) => {
    try {
        UserService.deleteUser(req.body.id);
    } catch {
        (e) => console.log(e);
    }
});

module.exports = router;
