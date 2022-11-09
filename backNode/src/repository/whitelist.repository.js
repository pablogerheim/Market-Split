import WhiteList from '../models/whiteList.model.js';
import connect from '../config/Postgreconnect.js';

async function getWhiteLists(token) {
    try {
        return await connect.query(`SELECT * FROM whitelists AS w INNER JOIN users as u ON w.user_id = u.user_id AND w.token = '${token}'`, { raw: true })
    } catch (err) {
        throw err;
    }
}

async function getwhiteListByUserId(id) {
    try {
        return await WhiteList.findAll({
            where: {
                user_id: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function createWhiteList(whiteUser) {
    try {
        return await WhiteList.create(whiteUser)
    } catch (err) {
        throw err;
    }
}

async function updateWhiteList(whiteUser) {
    try {
        return await WhiteList.update(whiteUser, {
            where: { user_id: whiteUser.user_id }
        }, { raw: true })
    } catch (err) {
        throw err;
    }
}

async function deleteWhiteList(token) {
    try {
        return await WhiteList.destroy({
            where: {
                token: token,
            },
        });
    } catch (err) {
        throw err;
    }
}

export default {
    getWhiteLists,
    createWhiteList,
    deleteWhiteList,
    getwhiteListByUserId,
    updateWhiteList
};