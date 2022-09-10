import express from 'express';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import userRoute from './routes/user.routes.js';
import productRoute from './routes/product.routes.js';

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

app.use('/user', userRoute);
app.use('/product', productRoute);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(3002, async() => {
    logger.info('API Started!');
});