import express from 'express';
import usersController from '../controllers/pruduct.controller.js';

const router = express.Router();

router.get('/', usersController.getUsers);

export default router;
