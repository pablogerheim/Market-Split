import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promises } from 'fs';
import loginRepository from '../repository/login.repository.js';

const { readFile, writeFile } = promises;

async function findUser(name) {
    const userdb = await loginRepository.printUser();

    return userdb.find(user => user.dataValues.name === name);
}

async function createUser(name, email, password) {
  //  let userdb = await baseRepository.readFileUser()
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    let user = {
        "user_id": userdb.nextId,
        "name": name,
        "email": email,
        "password": passwordHash,
        "timestamp": new Date
    }
    userdb.nextId++
        userdb.users.push(user)

  //  await baseRepository.writeFileUser(userdb)
    return user
}

async function compareUser(user, password) {
    return password == user.password
    // await bcrypt.compare(password, user.password);
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
