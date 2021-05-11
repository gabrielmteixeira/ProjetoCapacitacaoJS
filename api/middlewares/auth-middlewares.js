const passport = require('passport');
const jwt = require('jsonwebtoken');

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

module.exports = {loginMiddleware};
