import userRepository from '../repository/user.repository.js';

async function getUsers(id) {
  return await userRepository.getUsers(id);
}

export default {
  getUsers,
};
