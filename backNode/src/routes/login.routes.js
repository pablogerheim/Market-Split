import express from 'express';
import sessaoController from '../controllers/login.controller.js';

const router = express.Router();

router.post('/', sessaoController.login);
router.post('/register', sessaoController.register)

export default router;
