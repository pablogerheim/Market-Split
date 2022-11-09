import purchaseRepository from '../repository/purchase.repository.js';
import productRepository from "../repository/product.repository.js";

async function getPurchases(params) {
    return await purchaseRepository.getPurchases(params);
}

async function createPurchase(body) {

    let dateTime = new Date();
    dateTime = JSON.parse(JSON.stringify(dateTime));
    const purchase = {
        name: body.name,
        timestamp: dateTime,
        active: false,
        summary: {},
        group: body.group
    }

    return await purchaseRepository.createPurchase(purchase);
}

async function deletePurchase(id) {
    return await purchaseRepository.deletePurchase(id);
}

async function makePurchaseHistory(purchaseId) {
    const purchase = await purchaseRepository.getPurchases(purchaseId);
    const product = await productRepository.getProducts({_,purchaseId})

    console.log("productss", product)

    const historyPurchase = {
        purchaseId: purchaseId,
        name: purchase.name,
        active: true,
        summary: [...product],
        group: purchase.group
    }

    const history = await purchaseRepository.makePurchaseHistory(historyPurchase);

    await productRepository.clearProduct(purchaseId)

    return history
}

async function updatePurchase(purchase) {
    return await purchaseRepository.updatePurchase(purchase);
}

export default {
    getPurchases,
    updatePurchase,
    deletePurchase,
    createPurchase,
    makePurchaseHistory
};