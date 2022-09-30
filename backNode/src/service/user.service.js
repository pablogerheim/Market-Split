import userRepository from '../repository/user.repository.js';
import loginService from "./login.service.js";


async function getUsers(id) {
    return await userRepository.getUsers(id);
}

async function updateUser(user) {
    console.log(user)
    if (user.password !== '') {
        const upUser = await loginService.createUser(user, false)
        console.log('upUseru   ', upUser)
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