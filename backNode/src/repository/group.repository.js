import Group from '../models/group.model.js';

async function getgroup_members(id) {
    try {
        if (id) {
            return await Group.findByPk(id);
        }
        return await Group.findAll();
    } catch (err) {
        throw err;
    }
}

async function creategroup_member(group_member) {
    try {
        return await Group.create(group_member)
    } catch (err) {
        throw err;
    }
}

async function deletegroup_member(id) {
    try {
        return await Group.destroy({
            where: {
                group_id: id,
            },
        });
    } catch (err) {
        throw err;
    }
}


export default {
    getgroup_members,
    deletegroup_member,
    creategroup_member
};