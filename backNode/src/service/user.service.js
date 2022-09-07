import usersRepository from '../repository/users.repository.js';

async function getUsers(id) {
  return await usersRepository.getUsers(id);
}

export default {
  getUsers,
};
