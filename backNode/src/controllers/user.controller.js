import usersService from "../service/user.service.js";
import accessService from "../service/access.service.js"

async function getUsers(req, res, next) {
  try {
    if (!req.params.group_member) {
      return res.status(422).json({ msg: "The group_member is required!" });
    }
    const data = await usersService.getUsers(req.params);
    res.status(200).send(data);
    logger.info("GET /Users - All users", data);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const { name, password, access, group_member } = req.body;

    if (!token || token === "undefined" || token === false) {
      return res.status(422).json({ msg: "Missing token!" });
    }

    if (!access || !password || !name || !group_member) {
      return res.status(422).json("The Assess, Password, group_member and Name are required!");
    }
    const user = await accessService.findUser(name);
    if (user) {
      return res.status(422).json("This name is already being used");
    }
    const criatedUser = await usersService.createUser(req.body);
    res.status(200).json({ msg: "User created successfully!" });

    logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { name, access, userId } = req.body;

    if (!access || !name || !userId) {
      return res.status(422).json({ msg: "The Id, Assess, Password and Name are required!" });
    }
    const data = await usersService.updateUser(req.body);
    res.status(200).send(data);
    logger.info("UPDADE /User", { data });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const data = await usersService.deleteUser(req.params.id);
    res.status(200).send({ msg: "deleted sussesfull" });
    logger.info(` DELETE / User - ${JSON.stringify(data)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
