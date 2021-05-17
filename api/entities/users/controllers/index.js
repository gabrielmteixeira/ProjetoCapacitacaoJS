const router = require('express').Router();
const UserService = require('../services/UserService');
const {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');


router.post('/login', notLoggedIn(), loginMiddleware);

router.post('/', upload('createUser', 'user'), async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      image: req.file ? req.file.filename : 'default-user-icon.png',
      role: 'user',
      musicGenre: req.body.musicGenre,
      // birthday: req.body.birthday,
      birthday: Date.now(),
    };
    await UserService.createUser(user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});


router.get('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

// Get All
router.get('/',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.patch('/:id',
  jwtMiddleware,
  upload('updateUser', 'user'),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const body = req.body;
      const userId = req.params.id;
      const updatedUser = await UserService.alterUser(userId, body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
