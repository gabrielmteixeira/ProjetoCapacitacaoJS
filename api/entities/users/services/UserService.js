const User = require('../models/Users');

class UserService {
    async createUser(user) {
        await User.create(user);
    }

    async getUser(id) {
        await User.findByPk(id);
    }

    async alterUser(id, user) {
        const userFromDB = await User.findByPk(id);
        userFromDB.update(user);
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        await user.destroy();
    }
}

module.exports = new UserService();
