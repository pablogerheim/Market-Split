import express from 'express';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './src/doc.js';
import userRoute from './src/routes/user.routes.js';
import productRoute from './src/routes/product.routes.js';
import accessRoute from './src/routes/access.routes.js';
import purchaseRoute from './src/routes/purchase.routes.js';
import jwt from 'jsonwebtoken';
import accessRepository from './src/repository/access.repository.js';
import accessController from "./src/controllers/access.controller.js";
import * as dotenv from 'dotenv';

dotenv.config();

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
app.use('/purchase', purchaseRoute);
app.use('/checkToken', checkToken, accessController.checkToken);

async function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) { return res.status(401).json({ msg: 'Acesso negado!' }, false); }

    const token = authHeader && authHeader.split(' ')[1];

    if (!token || token === "undefined") {
        return res.status(401).json({ msg: 'Acesso negado!', token });
    }

    const blackList = await accessRepository.getBlackList();

    const blacktoken = blackList.blacktokens.find(t => t.token === token);
    if (blacktoken) {
        if (blacktoken.token === token) {
            return res.status(401).json({ msg: 'Acesso negado!' });
        }
    }

    try {
        const { publicKey } = JSON.parse(process.env.JWT_SECRET_PUBLIC_KEY || '{ publicKey: null }')

        jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        next();
    } catch (err) {
        next(err);
    }
}
const port = process.env.PORT

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(port, async() => {
    logger.info(`API Started! ${port}`);
});