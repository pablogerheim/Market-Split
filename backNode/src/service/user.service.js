import userRepository from '../repository/user.repository.js';
import bcrypt from 'bcrypt';

async function getUsers(params) {
    return await userRepository.getUsers(params);
}

async function createUser(user) {

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = user
    newUser.password = passwordHash
    
    await userRepository.createUser(newUser)

    return newUser
}

async function updateUser(user) {
    if (user.password !== '') {

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);
    
        const upUser = user
        upUser.password = passwordHash

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
    createUser,
    updateUser,
    deleteUser
};