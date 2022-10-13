import express from 'express';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import userRoute from './routes/user.routes.js';
import productRoute from './routes/product.routes.js';
import accessRoute from './routes/access.routes.js';
import jwt from 'jsonwebtoken';
import accessRepository from './repository/access.repository.js';
import accessController from "./controllers/access.controller.js";
import { promises } from 'fs';


const { readFile } = promises;

const {
    combine,
    timestamp,
    label,
    printf,
} = winston.format;
const myFormat = printf(({
    level,
    message,
    label,
    timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'base.log' }),
    ],
    format: combine(label({ label: 'base' }), timestamp(), myFormat),
});

const corsOptions = {
    credentials: true,
    origin: '*',
    Accept: '*/*',
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/access', accessRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/checkToken', checkToken, accessController.checkToken);

async function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) { return res.status(401).json({ msg: 'Acesso negado!' }, false); }

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' }, token);
    }

    const blackList = await accessRepository.getBlackList();

    const blacktoken = blackList.blacktokens.find(t => t.token === token);
    if (blacktoken) {
        if (blacktoken.token === token) {
            return res.status(401).json({ msg: 'Acesso negado!' });
        }
    }

    try {
        const publicKey = await readFile('./public.key', 'utf-8');

        jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        next();
    } catch (err) {
        next(err);
    }
}

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(3002, async() => {
    logger.info('API Started!');
});