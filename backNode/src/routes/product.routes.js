import express from 'express';
import productsController from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProducts);
router.patch('/', productsController.patchProducts);
router.delete('/:id', productsController.deleteProduct);
router.post('/', productsController.createProduct);
router.put('/', productsController.updateProduct);

export default router;