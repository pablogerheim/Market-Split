import User from '../models/user.model.js';
import WhiteList from '../models/whiteList.model.js';
import mongconnect from '../config/MongoDBconnect.js';
import connect from '../config/Postgreconnect.js';

async function getBlackList() {
    const conn = mongconnect();
    try {
        await conn.connect();
        const data = await conn
            .db('market')
            .collection('blacklist')
            .findOne({ blackList: 'BlackList' });
        return data;
    } catch (err) {
        throw err;
    } finally {
        await conn.close();
    }
}

async function updateBlackList(props) {
    const conn = mongconnect();
    try {
        await conn.connect();
        const data = await conn
            .db('market')
            .collection('blacklist')
            .findOneAndUpdate({ blackList: 'BlackList' }, { $set: {...props } }, );
        return data;
    } catch (err) {
        throw err;
    } finally {
        await conn.close();
    }
}

async function printUser() {
    try {
        return await User.findAll();
    } catch (err) {
        throw err;
    }
}

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
    printUser,
    getBlackList,
    updateBlackList,
    getWhiteLists,
    createWhiteList,
    deleteWhiteList,
    getwhiteListByUserId,
    updateWhiteList
};