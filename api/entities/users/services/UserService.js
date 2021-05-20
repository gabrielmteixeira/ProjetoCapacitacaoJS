const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
const bcrypt = require('bcrypt');
const {unlink} = require('fs').promises;
const path = require('path');
const User = require('../models/Users');

class UserService {
  async createUser(user) {
    const bcryptSalt = 10;
    user.password = await bcrypt.hash(user.password, bcryptSalt);
    await User.create(user);
  }

  async getAll() {
    const users = await User.findAll();
    if (!users) {
      throw new EmptyDatabaseError(
        'Não existem entidades na tabela requisitada');
    }

    return users;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }

    return user;
  }

  async alterUser(id, body) {
    const user = User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }

    await user.update(body);
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new InvalidParamError(`Não há usuário com o ID ${id}!`);
    }
    await unlink(
      path.resolve(
        __dirname,
        '../../../../paper-dashboard-react/src/assets/img/entities/users',
        user.image,
      ),
    );
    await user.destroy();
  }
}

module.exports = new UserService();
