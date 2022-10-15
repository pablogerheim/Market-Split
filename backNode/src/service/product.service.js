import productRepository from '../repository/product.repository.js';

async function getProducts(params) {
    return await productRepository.getProducts(params);
}

async function patchProducts(body) {
    return await productRepository.patchProduct(body);
}

async function deleteProduct(params) {
    return await productRepository.deleteProduct(params);
}

async function clearProduct(purchase) {
    return await productRepository.clearProduct(purchase);
}

async function createProduct(product) {
    return await productRepository.createProduct(product);
}

async function updateProduct(product) {
    return await productRepository.updateProduct(product);
}

export default {
    getProducts,
    patchProducts,
    deleteProduct,
    clearProduct,
    createProduct,
    updateProduct,
};