import usersService from '../service/user.service.js';

async function getUsers(req, res, next) {
    try {
        const data = await usersService.getUsers(req.params.id);
        res.status(200).send(data);
        logger.info('GET /Users - All users', data);
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const { name, password, access, group } = req.body;

        if (!token || token === 'undefined' || token === false) {
            return res.status(422).json({ msg: "Missing token!" });
        }

        if (!access || !password || !name || !group) {
            return res.status(422).json({ msg: "The Assess, Password, Group and Name are required!" });
        }
        const user = await accessService.findUser(name);
        if (user) {
            return res.status(422).json({ msg: "This name is already being used" });
        }
        const criatedUser = await accessService.controlUser(req.body)
        res.status(200).json({ msg: "User created successfully!" });

        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const { name, access, userId, group} = req.body;

        if (!access || !name || !userId || !group) {
            return res.status(422).json({ msg: "The Id, Assess, Password, Group and Name are required!" });
        }
        const data = await usersService.updateUser(req.body);
        res.status(200).send(data);
        logger.info('UPDADE /User', { data });
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
    deleteUser
};