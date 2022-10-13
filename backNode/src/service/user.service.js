import userRepository from '../repository/user.repository.js';
import accessService from "./access.service.js";


async function getUsers(id) {
    return await userRepository.getUsers(id);
}

async function updateUser(user) {
    if (user.password !== '') {
        const upUser = await accessService.controlUser(user, false)

        return await userRepository.updateUser(upUser);
    } else {
        user.password = undefined
        return await userRepository.updateUser(user);
    }
}

async function deleteUser(id) {
    return await userRepository.deleteUser(id);
}

export default {
    getUsers,
    updateUser,
    deleteUser
};