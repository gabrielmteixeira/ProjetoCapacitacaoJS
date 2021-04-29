const User = require('../models/Users');

class UserService {
    async createUser(user) {
        await User.create(user);
    }

    async getAll() {
        const users = await User.findAll();
        return users;
    }

    async getUser(id) {
        return await User.findByPk(id);
    }

    async alterUser(id, body) {
        const user = User.findByPk(id);
        await user.update(body);
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        await user.destroy();
    }
}

module.exports = new UserService();
