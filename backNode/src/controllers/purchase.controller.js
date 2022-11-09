import purchasesService from '../service/purchase.service.js';

async function getPurchases(req, res, next) {
    try {
        if (!req.params.group_member) {
            return res.status(422).json({ msg: "The group_member is required!" });
        }
        const data = await purchasesService.getPurchases(req.params);

        res.status(200).send(data);
        logger.info('GET /Purchases - All purchases', data);
    } catch (err) {
        next(err);
    }
}

async function createPurchase(req, res, next) {
    try {
        const { name, group_member } = req.body;

        if (!name || !group_member) {
            return res.status(422).json({ msg: "The Group_member and Name are required!" });
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

async function makePurchaseHistory(req, res, next) {
    try {
        const { purchaseId } = req.body;
        if (!purchaseId) {
            return res.status(422).json({ msg: "The Id are required!" });
        }
        const data = await purchasesService.makePurchaseHistory(purchaseId);
        res.status(200).send(data);
        logger.info('Make history /Purchase', { data });
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
    createPurchase,
    makePurchaseHistory
};