const passport = require('passport');
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

function loginMiddleware(req, res, next) {
  passport.authenticate(
    'login',
    (error, user) => {
      try {
        if (error) {
          return res.status(400).json(error);
        }

        req.login(user, {session: false}, (err) => {
          if (err) {
            return res.status(400).json(err);
          }

          // Aqui ficam as informações a serem guardadas no cookie (jwt)
          const body = {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.image,
          };
          const token = jwt.sign({user: body}, process.env.SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRATION});

          res.cookie('jwt', token, {
            // Opções do cookie:
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
          });
          res.status(200).end();
        });
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
}

function jwtMiddleware(req, res, next) {
  passport.authenticate('jwt', {session: false}, (error, user) => {
    try {
      if (error) next(error);

      if (!user) {
        throw new NotAuthorizedError('Você precisa estar logado!');
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

function notLoggedIn(errorMessage) {
  return (req, res, next) => {
    try {
      const token = req.cookies['jwt'];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY,
          (err, decoded) => {
            if (!(err instanceof jwt.TokenExpiredError)) {
              throw new NotAuthorizedError(errorMessage ||
                'Você já está logado no sistema!');
            }
          },
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

function checkRole(roleArr) {
  return function(req, res, next) {
    try {
      if (roleArr.indexOf(req.user.role) !== -1) {
        next();
      } else {
        throw new NotAuthorizedError(
          'Você não tem permissão para realizar essa ação!');
      }
    } catch (error) {
      next(error);
    };
  };
}

module.exports = {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
};
