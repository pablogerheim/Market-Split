import Purchase from "../models/purchase.model.js";

async function getPurchases({ id, group_member }) {
  try {
    if (id) {
      return await Purchase.findByPk(id);
    }
    return await Purchase.findAll({
      where: {
        group_member: group_member,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function createPurchase(purchase) {
  try {
    return await Purchase.create(purchase);
  } catch (err) {
    throw err;
  }
}

async function deletePurchase(id) {
  try {
    return await Purchase.destroy({
      where: {
        purchaseId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updatePurchase(purchase) {
  try {
    return await Purchase.update(purchase, {
      where: {
        purchaseId: purchase.purchaseId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  getPurchases,
  deletePurchase,
  updatePurchase,
  createPurchase,
};
