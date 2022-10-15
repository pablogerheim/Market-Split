import purchaseRepository from '../repository/purchase.repository.js';
import accessService from "./access.service.js";


async function getPurchases(id) {
    return await purchaseRepository.getPurchases(id);
}

async function updatePurchase(purchase) {
    if (purchase.password !== '') {
        const upPurchase = await accessService.controlPurchase(purchase, false)

        return await purchaseRepository.updatePurchase(upPurchase);
    } else {
        purchase.password = undefined
        return await purchaseRepository.updatePurchase(purchase);
    }
}
async function createPurchase(id) {
    return await purchaseRepository.createPurchase(id);
}


async function deletePurchase(id) {
    return await purchaseRepository.deletePurchase(id);
}

export default {
    getPurchases,
    updatePurchase,
    deletePurchase,
    createPurchase
};