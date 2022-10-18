import purchaseRepository from '../repository/purchase.repository.js';
import accessService from "./access.service.js";


async function getPurchases(id) {
    return await purchaseRepository.getPurchases(id);
}

async function createPurchase(body) {
    let dateTime = new Date();
    dateTime = JSON.parse(JSON.stringify(dateTime));
    const purchase = {
        name: body.name,
        timestamp: dateTime,
        active: false,
        summary: {}
    }
    return await purchaseRepository.createPurchase(purchase);
}

async function deletePurchase(id) {
    return await purchaseRepository.deletePurchase(id);
}

async function updatePurchase(purchase) {
    return await purchaseRepository.updatePurchase(purchase);
}

export default {
    getPurchases,
    updatePurchase,
    deletePurchase,
    createPurchase
};