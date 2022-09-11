import usersService from '../service/user.service.js';

async function getUsers(req, res, next) {
  try {
    const data = await usersService.getUsers(req.params.id);
    res.status(200).send(data);
    logger.info('GET /Users - All users');
  } catch (err) {
    next(err);
  }
}

export default {
  getUsers,
};
