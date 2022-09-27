import userRepository from '../repository/user.repository.js';

async function getUsers(id) {
    return await userRepository.getUsers(id);
}

async function updateUser(user) {
    return await userRepository.updateUser(user);
}

async function deleteUser(id) {
    return await userRepository.deleteUser(id);
}

export default {
    getUsers,
    updateUser,
    deleteUser
};