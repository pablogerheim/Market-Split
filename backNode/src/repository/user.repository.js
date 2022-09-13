import User from '../models/user.model.js';

async function getUsers(id) {
    try {
        if (id) {
            return await User.findByPk(id);
        }
        return await User.findAll();
    } catch (err) {
        throw err;
    }
}

export default {
    getUsers,
};