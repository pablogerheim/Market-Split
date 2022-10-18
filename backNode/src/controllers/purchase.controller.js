import purchasesService from '../service/purchase.service.js';

async function getPurchases(req, res, next) {
    try {
        const data = await purchasesService.getPurchases(req.params.id);
        res.status(200).send(data);
        logger.info('GET /Purchases - All purchases', data);
    } catch (err) {
        next(err);
    }
}

async function createPurchase(req, res, next) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ msg: "The Id and Name are required!" });
        }
        const data = await purchasesService.createPurchase(req.body);
        res.status(200).send(data);
        logger.info('UPDADE /Purchase', { data });
    } catch (err) {
        next(err);
    }
}

async function updatePurchase(req, res, next) {
    try {
        const { purchaseId } = req.body;
        if (!purchaseId) {
            return res.status(422).json({ msg: "The Id are required!" });
        }
        const data = await purchasesService.updatePurchase(req.body);
        res.status(200).send(data);
        logger.info('UPDADE /Purchase', { data });
    } catch (err) {
        next(err);
    }
}

async function deletePurchase(req, res, next) {
    try {
        const data = await purchasesService.deletePurchase(req.params.id);
        res.status(200).send({ msg: "deleted sussesfull" });
        logger.info(` DELETE / Purchase - ${JSON.stringify(data)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    getPurchases,
    updatePurchase,
    deletePurchase,
    createPurchase
};