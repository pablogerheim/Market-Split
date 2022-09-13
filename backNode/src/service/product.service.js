import productRepository from '../repository/product.repository.js';

async function getProducts(id) {
    return await productRepository.getProducts(id);
}

async function patchProducts(body) {
    return await productRepository.patchProduct(body);
}

async function deleteProduct() {
    return await productRepository.clearProduct();
}

async function clearProduct(id) {
    return await productRepository.deleteProduct(id);
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