import vehiclesRepository from '../repository/vehicles.repository.js';

async function getVehicles(id) {
    return await vehiclesRepository.getVehicles(id);
}

async function patchVehicles(id) {
    return await vehiclesRepository.patchVehicles(id);
}

async function deleteVehicle(id) {
    return await vehiclesRepository.deleteVehicle(id);
}

async function createVehicle(vehicle) {
    return await vehiclesRepository.createVehicle(vehicle);
}

async function updateVehicle(vehicle) {
    return await vehiclesRepository.updateVehicle(vehicle);
}

export default {
    getVehicles,
    patchVehicles,
    deleteVehicle,
    createVehicle,
    updateVehicle,
};
