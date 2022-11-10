import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import blackListRepository from "../repository/blacklist.repository.js"
import whiteListRepository from "../repository/whitelist.repository.js";
import userRepository from "../repository/user.repository.js";
import groupRepository from "../repository/group.repository.js";
import validate from "../helper/helperList.js";
import * as dotenv from 'dotenv';

dotenv.config();

async function findUser(name) {
    const users = await userRepository.findUser()
    return users.find(user => user.dataValues.name === name);
}

async function register(user) {

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);
    const group_member = await groupRepository.creategroup_member()

    const newUser = user
    newUser.password = passwordHash
    newUser.access = 'Adm'
    newUser.group_member = group_member.dataValues.groupId

    await userRepository.createUser(newUser)

    return newUser
}

async function compareUser(user, password) {
    return await bcrypt.compare(password, user.password);
}

async function createToken(user) {
    const { privateKey } = JSON.parse(process.env.JWT_SECRET_PRIVATE_KEY || '{ privateKey: null }')

    const token = jwt.sign({ id: user._id }, privateKey, {
        expiresIn: 3600,
        algorithm: 'RS256',
    });

    return token;
}

async function logout(token) {

    const blackList = await blackListRepository.getBlackList();
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

    await blackListRepository.updateBlackList(blackList);
  return await whiteListRepository.deleteWhiteList(token)
}

async function getWhiteLists(token) {
    return await whiteListRepository.getWhiteLists(token)
}

async function createWhiteList(whiteUser) {

    const witheItem = await whiteListRepository.getwhiteListByUserId(whiteUser.user_id)

    if (witheItem[0]) {
        if (whiteUser.user_id === witheItem[0].user_id) {
            await whiteListRepository.updateWhiteList(whiteUser)
        } else { await whiteListRepository.createWhiteList(whiteUser) }
    } else { await whiteListRepository.createWhiteList(whiteUser) }
}

async function deleteWhiteList(token) {
  return await whiteListRepository.deleteWhiteList(token)
}


export default {
    findUser,
    register,
    compareUser,
    createToken,
    logout,
    getWhiteLists,
    createWhiteList,
    deleteWhiteList
};