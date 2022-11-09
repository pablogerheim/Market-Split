import Group from '../models/group.model.js';

async function getGroups(id) {
    try {
        if (id) {
            return await Group.findByPk(id);
        }
        return await Group.findAll();
    } catch (err) {
        throw err;
    }
}

async function createGroup(group) {
    try {
        return await Group.create(group)
    } catch (err) {
        throw err;
    }
}

async function deleteGroup(id) {
    try {
        return await Group.destroy({
            where: {
                groupId: id,
            },
        });
    } catch (err) {
        throw err;
    }
}


export default {
    getGroups,
    deleteGroup,
    createGroup
};