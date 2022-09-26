import loginService from '../service/login.service.js';

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(422).json({ msg: "O Email, Password e Nome são obrigatórios!" });
        }
        const user = await loginService.findUser(email);
        if (user) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }
        const criatedUser = await loginService.createUser(name, email, password)
        res.status(201).json({ msg: "Usuário criado com sucesso!" });

        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {
    console.log(req.body)
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res
                .status(422)
                .json({ msg: 'O Email e Password são obrigatórios!' });
        }

        const user = await loginService.findUser(name);
        const { id } = user;
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }
        console.log(user)
        const checkPassword = loginService.compareUser(user, password);

        if (!checkPassword) {
            return res.status(422).json({ msg: 'password inválida' });
        }

        const token = await loginService.createToken(user);
        const account = { id, name, token };
        res.status(200).send({ id, name, token });

        logger.info(`POST /login ADM - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    register,
    login
};
