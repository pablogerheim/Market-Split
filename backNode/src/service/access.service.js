import jwt from 'jsonwebtoken';
import bcrypt from '../../bcrypt/bcrypt.js';
import { promises } from 'fs';
import accessRepository from "../repository/access.repository.js"
import userRepository from "../repository/user.repository.js";
import validate from "../helper/helperList.js";
import * as dotenv from 'dotenv';

dotenv.config();

const { readFile } = promises;

async function findUser(name) {
    const users = await userRepository.getUsers()

    return users.find(user => user.dataValues.name === name);
}

async function controlUser(user, bool = true) {

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = user
    newUser.password = passwordHash
    newUser.timestamp = new Date

    bool && await userRepository.createUser(newUser)

    return newUser
}

async function compareUser(user, password) {
    return await bcrypt.compare(password, user.password);
}

async function createToken(user) {
    const privateKey = process.env.JWT_SECRET_PRIVATE_KEY
    console.log("private", privateKey)

    const token = jwt.sign({ id: user._id }, privateKey, {
        expiresIn: 3600,
        algorithm: 'RS256',
    });

    return token;
}

async function logout(token) {

    const blackList = await accessRepository.getBlackList();
    let dateTime = new Date();
    dateTime = JSON.parse(JSON.stringify(dateTime));
    const blacktoken = { token, dateT: dateTime };
    const currentTokens = [];
    if (blackList) {
        blackList.blacktokens.forEach(e => {
            if (validate(e.dateT)) {
                currentTokens.push(e);
            }
        });
    }

    blackList.blacktokens = currentTokens;
    blackList.blacktokens.push(blacktoken);

    await accessRepository.updateBlackList(blackList);
    await accessRepository.deleteWhiteList(token)
}

async function getWhiteLists(token) {
    return await accessRepository.getWhiteLists(token)
}

async function createWhiteList(whiteUser) {

    const witheItem = await accessRepository.getwhiteListByUserId(whiteUser.user_id)

    if (witheItem[0]) {
        if (whiteUser.user_id === witheItem[0].user_id) {
            await accessRepository.updateWhiteList(whiteUser)
        } else { await accessRepository.createWhiteList(whiteUser) }
    } else { await accessRepository.createWhiteList(whiteUser) }
}

async function deleteWhiteList(token) {
    await accessRepository.deleteWhiteList(token)
}


export default {
    findUser,
    controlUser,
    compareUser,
    createToken,
    logout,
    getWhiteLists,
    createWhiteList,
    deleteWhiteList
};