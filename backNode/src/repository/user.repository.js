import User from "../models/user.model.js";

async function getUsers({ id, group_member }) {
  try {
    if (id) {
      return await User.findByPk(id);
    }

    return await User.findAll({
      where: {
        group_member: group_member,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function findUser() {
  try {
    return await User.findAll();
  } catch (err) {
    throw err;
  }
}

async function createUser(user) {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
}

async function deleteUser(id) {
  try {
    return await User.destroy({
      where: {
        userId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateUser(user) {
  try {
    return await User.update(user, {
      where: {
        userId: user.userId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
  findUser
};
