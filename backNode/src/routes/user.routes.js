import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;