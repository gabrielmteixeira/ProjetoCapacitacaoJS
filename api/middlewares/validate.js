const {validationResult} = require('express-validator');
const {unlink} = require('fs').promises;
const path = require('path');

function validate(validations, type) {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        await validation.run(req);
      }

      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (req.file) {
          let dir;
          if (type === 'user') {
            dir = 'users';
          } else if (type === 'album') {
            dir = 'albums';
          }

          await unlink(
            path.resolve(
              __dirname,
              '../../paper-dashboard-react/src/assets/img/entities',
              dir,
              req.file.filename),
          );
        }

        result.errors.forEach((error) => delete error.value);
        return res.status(400).json(result.errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {validate};
