import express from 'express';
import productsController from '../controllers/product.controller.js';

const router = express.Router();

router.get('/:purchase', productsController.getProducts);
router.get('/:id/:purchase', productsController.getProducts);
router.patch('/', productsController.patchProducts);
router.delete('/clear/:purchase', productsController.clearProduct);
router.delete('/:id/:purchase', productsController.deleteProduct);
router.post('/', productsController.createProduct);
router.put('/', productsController.updateProduct);

export default router;