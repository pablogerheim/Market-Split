import Products from '../models/product.model.js';

async function getProducts(params) {
    try {
        if (params.id) {
            return await Products.findByPk(params.id);
        }
        return await Products.findAll({ where: { purchase: params.purchase } });
    } catch (err) {
        throw err;
    }
}

async function patchProduct({ productId, quantity }) {
    try {
        await Products.update({ quantity }, {
            where: {
                productId,
            },
        });
    } catch (err) {
        throw err;
    }
}

async function deleteProduct(params) {
    try {
        return await Products.destroy({
            where: {
                productId: params.id,
            },
        });
    } catch (err) {
        throw err;
    }
}

async function clearProduct(purchase) {
    try {
        return await Products.destroy({
            where: {
                purchase: purchase,
            },
        })
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
    getProducts,
    patchProduct,
    deleteProduct,
    clearProduct,
    createProduct,
    updateProduct,
};