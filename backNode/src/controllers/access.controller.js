import accessService from '../service/access.service.js';

async function register(req, res, next) {
    try {
        const { name, password } = req.body;
        if ( !password || !name) {
           return res.status(422).send({ msg: "The Password and Name are required!" });
        }
        const user = await accessService.findUser(name);
        if (user) {
            return res.status(422).json({ msg: "This name is already being used" });
        }
        const criatedUser = await accessService.register(req.body)
        res.status(200).json({ msg: "User created successfully!" });

        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    console.log(req.body)
    try {
       
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(422).json({ msg: 'The Password and Name are required!' });
        }

        const user = await accessService.findUser(name);
        console.log("test")
        if (!user) {
            return res.status(404).json({ msg: 'User not found!' });
        }
        const checkPassword = await accessService.compareUser(user, password);
        
        if (!checkPassword) {
            return res.status(401).json({ msg: 'password invalid' });
        }



        const token = await accessService.createToken(user);
        if (!token) {
            return res.status(401).json({ msg: 'token Error' });
        }

        const account = { token, user: user.dataValues };

        console.log(account)

        await accessService.createWhiteList({ token, user_id: user.dataValues.userId })

        res.status(200).send(account);

        logger.info(`POST /login ${JSON.stringify(account.user.access)} - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function logout(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        if (!token || token === 'undefined' || token === false) {
            throw new Error('token missing');
        }
        await accessService.logout(token)
        res.status(200).json({ msg: ' successfully logged out ' });
        logger.info(' Logout ');
    } catch (err) {
        next(err);
    }
}

async function checkToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const user = await accessService.getWhiteLists(token);
        if (!user) {
            return res.status(422).json({ msg: "Token not found" });
        }
        res.status(200).json({ msg: "User created successfully!", user: user[0][0] });
        logger.info(`CheckToken / - ${JSON.stringify(user[0][0])}`);
    } catch (err) {
        next(err);
    }
}

export default {
    register,
    login,
    logout,
    checkToken
};