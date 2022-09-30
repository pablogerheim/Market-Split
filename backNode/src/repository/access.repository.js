import User from '../models/user.model.js';
import BlackList from "../models/blackList.model.js";


async function getBlackList() {
    try {
        return await BlackList.findAll();
    } catch (err) {
        throw err;
    }
}

async function updateBlackList(tokens) {
    try {
        await BlackList.update(tokens, {
            where: {
                tokenId: 1,
            },
        });
    } catch (err) {
        throw err;
    }
}

async function printUser() {
    try {
        return await User.findAll();
    } catch (err) {
        throw err;
    }
}

export default {
    printUser,
    getBlackList,
    updateBlackList,
};