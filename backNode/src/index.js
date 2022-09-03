import express from 'express';
import winston from 'winston';
import vehiclesRoute from './routes/vehicles.routes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import { promises } from 'fs';

const { readFile, writeFile } = promises;
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
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

app.use('/', vehiclesRoute);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(3002, async () => {
    try {
        await readFile('db.json');
        logger.info('API Started!');
    } catch (err) {
        const initialJson = {
            nextId: 1,
            vehicles: [],
        };
        writeFile('db.json', JSON.stringify(initialJson))
            .then(() => {
                logger.info('API Started and File Created!');
            })
            .catch(err => {
                logger.error(err);
            });
    }
});
