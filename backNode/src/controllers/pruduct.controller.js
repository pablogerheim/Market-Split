import vehiclesService from '../service/vehicles.service.js';

async function getVehicles(req, res, next) {
    try {
        const data = await vehiclesService.getVehicles(req.params.id);
        res.status(200).send(data);
        logger.info(`GET /Vehicles - All vehicles`);
    } catch (err) {
        next(err);
    }
}

async function patchVehicles(req, res, next) {
    try {
        if (!req.body.id) {
            throw new Error('ID é obrigatório');
        }
        const data = await vehiclesService.patchVehicles(req.body.id);
        res.send(JSON.stringify(data));
    } catch (err) {
        next(err);
    }
}

async function deleteVehicle(req, res, next) {
    try {
        await vehiclesService.deleteVehicle(req.params.id);
        res.status(200).json({ msg: 'Deleção realizada com sucesso!' });
        logger.info(`DELETE /Vehicle- ID ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function createVehicle(req, res, next) {
    try {
        const { name, description, plate, year, color, price } = req.body;
        if (
            !name == null ||
            description == null ||
            plate == null ||
            year == null ||
            color == null ||
            price == null
        ) {
            return res
                .status(422)
                .json({
                    msg: 'O Nome, Descrição, Placa, Ano, Cor e Preço são obrigatórios!',
                });
        }
        const vehicle = await vehiclesService.createVehicle(req.body);
        res.status(200).json({
            msg: 'Criação realizada com sucesso!',
            vehicle,
        });
        logger.info(`POST /creat Vehicle - ${JSON.stringify(vehicle)}`);
    } catch (err) {
        next(err);
    }
}

async function updateVehicle(req, res, next) {
    try {
        const { name, description, plate, year, color, price, id } = req.body;
        if (
            !name == null ||
            description == null ||
            plate == null ||
            year == null ||
            color == null ||
            price == null ||
            id == null
        ) {
            return res
                .status(422)
                .json({
                    msg: 'O Nome, Descrição, Placa, Ano, Cor, Preço e Id são obrigatórios!',
                });
        }
        const vehicle = await vehiclesService.updateVehicle(req.body);
        res.status(200).json({
            msg: 'Atualização realizada com sucesso!',
            vehicle,
        });
        logger.info(`PUT /update Vehicle - ${JSON.stringify(vehicle)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    getVehicles,
    patchVehicles,
    deleteVehicle,
    createVehicle,
    updateVehicle,
};
