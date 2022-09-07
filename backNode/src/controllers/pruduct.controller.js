import productsService from '../service/products.service.js';

async function getProducts(req, res, next) {
  try {
    const data = await productsService.getProducts(req.params.id);
    res.status(200).send(data);
    logger.info('GET /Products - All products');
  } catch (err) {
    next(err);
  }
}

async function patchProducts(req, res, next) {
  try {
    const { id, quantity } = req.body;
    if (id == null || quantity == null) {
      throw new Error('ID and quantity are required');
    }
    const data = await productsService.patchProducts(req.body);
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productsService.deleteProduct(req.params.id);
    res.status(200).json({ msg: 'Deletion performed successfully!' });
    logger.info(`DELETE /Product- ID ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const {
      name, participants, quantity, price,
    } = req.body;
    if (name == null
            || participants == null
            || quantity == null
            || price == null
    ) {
      return res
        .status(422)
        .json({
          msg: 'The Name, Participants, Quantity and Price are required!',
        });
    }
    const product = await productsService.createProduct(req.body);
    res.status(200).json({
      msg: 'Creation successful!',
      product,
    });
    logger.info(`POST /creat Product - ${JSON.stringify(product)}`);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const {
      name, participants, quantity, price, id,
    } = req.body;
    if (name == null
            || participants == null
            || quantity == null
            || price == null
            || id == null
    ) {
      return res
        .status(422)
        .json({
          msg: 'The Name, Participants, Quantity, Price and id are required!',
        });
    }
    const product = await productsService.updateProduct(req.body);
    res.status(200).json({
      msg: 'Update successful!',
      product,
    });
    logger.info(`PUT /update Product - ${JSON.stringify(product)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  getProducts,
  patchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
