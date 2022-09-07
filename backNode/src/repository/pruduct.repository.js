import Products from '../models/products.model.js';

async function getProducts(id) {
  try {
    if (id) {
      return await Products.findByPk(id);
    }
    return await Products.findAll();
  } catch (err) {
    throw err;
  }
}

async function patchProduct({ id, active }) {
  try {
    await Products.update({ active }, {
      where: {
        productId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    return await Products.destroy({
      where: {
        productId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function createProduct(product) {
  try {
    return await Products.create(product);
  } catch (err) {
    throw err;
  }
}

async function updateProduct(product) {
  try {
    await Products.update(product, {
      where: {
        productId: product.productId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  patchProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
