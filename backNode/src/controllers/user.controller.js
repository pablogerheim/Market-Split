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

async function updateUser(req, res, next) {
    try {
        const { name, password, access, userId } = req.body;

        if (!access || !password || !name || !userId) {
            return res.status(422).json({ msg: "The Id, Assess, Password and Name are required!" });
        }
        const data = await usersService.updateUser(req.body);
        res.status(200).send(data);
        logger.info('UPDADE /User', { data });
    } catch (err) {
        next(err);
    }
}


async function deleteUser(req, res, next) {
    console.log("delete", req.params.id)
    try {
        const data = await usersService.deleteUser(req.params.id);
        console.log(data)
        res.status(200).send({ msg: "deleted sussesfull" });
        logger.info(` DELETE / User - ${JSON.stringify(data)}`);
    } catch (err) {
        next(err);
    }
}



export default {
    getUsers,
    updateUser,
    deleteUser
};