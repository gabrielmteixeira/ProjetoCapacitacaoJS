const router = require('express').Router();
const UserService = require('../services/UserService');
const CustomerMusicService = require(
  '../../users/services/CustomerMusicService');
const {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
  checkDataBelongsToUser,
} = require('../../../middlewares/auth-middlewares');
const {upload} = require('../../../middlewares/multer');
const {userValidate} = require('../../../middlewares/user-validator');
const {requestFilter} = require('../../../middlewares/object-filter');

router.post('/login',
  requestFilter('body', ['email', 'password']),
  notLoggedIn(),
  userValidate('login'),
  loginMiddleware);

router.post(
  '/',
  upload('createUser', 'user'),
  requestFilter('body', [
    'email',
    'username',
    'password',
    'passwordConfirmation',
    'name',
    'image',
    'role',
    // Not sure about musicGenre
    'musicGenre',
    'birthday',
  ]),
  notLoggedIn(),
  userValidate('registerUser'),
  async (req, res, next) => {
    try {
      const user = req.body;
      user.image = req.file ? req.file.filename : 'default-user-icon.png';
      user.role = 'user';
      // \/Posteriormente será fornecido pelo fonrt e sairá daki
      user.birthday = Date.now(),
      await UserService.createUser(user);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

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

// Get one user's musics
router.get('/:id/musics',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userMusics = await CustomerMusicService.getMusics(userId);
      res.status(200).json(userMusics);
    } catch (error) {
      next(error);
    }
  },
);

// Get All
router.get('/', jwtMiddleware, async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  jwtMiddleware,
  checkDataBelongsToUser('user'),
  upload('updateUser', 'user'),
  requestFilter('body', [
    'email',
    'username',
    'password',
    'name',
    'image',
    'role',
    // Not sure about musicGenre
    'musicGenre',
    'birthday',
  ]),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const body = req.body;
      body.image = req.file ? req.file.fillename : undefined;
      const userId = req.params.id;
      const updatedUser = await UserService.alterUser(userId, body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  jwtMiddleware,
  checkRole(['admin']),
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
