import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promises } from 'fs';
//import loginRepository from '../repository/login.repository.js';
import userRepository from "../repository/user.repository.js";

const { readFile } = promises;

async function findUser(name) {
    const users = await userRepository.getUsers()

    return users.find(user => user.dataValues.name === name);
}

async function createUser(user, bool = true) {

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = user
    newUser.password = passwordHash
    newUser.timestamp = new Date

    console.log(bool)
    bool && await userRepository.createUser(newUser)

    return newUser
}

async function compareUser(user, password) {
    return password == user.password
        //await bcrypt.compare(password, user.password);
}

async function createToken(user) {
    const privateKey = await readFile('./private.key', 'utf-8');

    const token = jwt.sign({ id: user._id }, privateKey, {
        expiresIn: 3600,
        algorithm: 'RS256',
    });
    return token;
}

export default {
    findUser,
    createUser,
    compareUser,
    createToken,
};