import accessService from '../service/access.service.js';


async function register(req, res, next) {
    try {
        const { name, password, access } = req.body;
        if (!access || !password || !name) {
            return res.status(422).json({ msg: "The Assess, Password and Name are required!" });
        }
        const user = await accessService.findUser(name);
        if (user) {
            return res.status(422).json({ msg: "This name is already being used" });
        }
        const criatedUser = await accessService.controlUser(req.body)
        res.status(200).json({ msg: "User created successfully!" });

        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res
                .status(422)
                .json({ msg: 'The Password and Name are required!' });
        }

        const user = await accessService.findUser(name);
        const { id } = user;
        if (!user) {
            return res.status(404).json({ msg: 'User not found!' });
        }
        const checkPassword = accessService.compareUser(user, password);

        if (!checkPassword) {
            return res.status(422).json({ msg: 'password invalid' });
        }

        const token = await accessService.createToken(user);
        const account = { id, name, token };
        res.status(200).send({ id, name, token });

        logger.info(`POST /login ADM - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function logout(req, res, next) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        if (!token) {
            throw new Error('token missing');
        }
        await accessService.logout(token)

        res.status(200).json({ msg: ' successfully logged out ' });
        logger.info(' Logout ');
    } catch (err) {
        next(err);
    }
}

export default {
    register,
    login,
    logout
};