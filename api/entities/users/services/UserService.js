const User = require('../models/Users');
const bcrypt = require('bcrypt');
const InvalidParamError = require('../../../errors/InvalidParamError');

class UserService {
  async createUser(user) {
    const bcryptSalt = 10;
    user.password = await bcrypt.hash(user.password, bcryptSalt);
    await User.create(user);
  }

  async getAll() {
    const users = await User.findAll();
    return users;
  }

  async getUser(id) {
    const user = await User.findByPk(id);

    if (user !== null) {
      return user;
    } else {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
  }

  async alterUser(id, body) {
    const user = User.findByPk(id);

    if (user !== null) {
      await user.update(body);
    } else {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (user !== null) {
      await user.destroy();
    } else {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
  }
}

module.exports = new UserService();
