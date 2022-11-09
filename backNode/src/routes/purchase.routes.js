import express from 'express';
import purchaseController from '../controllers/purchase.controller.js';

const router = express.Router();

router.get('/', purchaseController.getPurchases);
router.get('/:id', purchaseController.getPurchases);
router.patch('/', purchaseController.makePurchaseHistory);
router.post('/', purchaseController.createPurchase);
router.put('/', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);

export default router;