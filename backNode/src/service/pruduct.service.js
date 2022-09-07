import productsRepository from '../repository/products.repository.js';

async function getProducts(id) {
  return await productsRepository.getProducts(id);
}

async function patchProducts(body) {
  return await productsRepository.patchProducts(body);
}

async function deleteProduct(id) {
  return await productsRepository.deleteProduct(id);
}

async function createProduct(product) {
  return await productsRepository.createProduct(product);
}

async function updateProduct(product) {
  return await productsRepository.updateProduct(product);
}

export default {
  getProducts,
  patchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
