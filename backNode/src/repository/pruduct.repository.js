import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function readFileFunction() {
    return JSON.parse(await readFile('db.json'));
}

async function writeFileFunction(obj) {
    await writeFile('db.json', JSON.stringify(obj, null, 2));
}

async function getVehicles(id) {
    if (!id) {
        const data = await readFileFunction();
        return data.vehicles;
    }
    id = parseInt(id);
    const data = await readFileFunction();
    return data.vehicles.find(e => e.id === id);
}

async function patchVehicles(id) {
    id = parseInt(id);
    const data = await readFileFunction();
    let vehicle = data.vehicles.find(vehicle => vehicle.id === id);

    if (vehicle === undefined) {
        throw new Error('pedido Não encontrado');
    } else {
        vehicle.isFavorite = vehicle.isFavorite ? false : true;
        await writeFileFunction(data);
        return vehicle;
    }
}

async function deleteVehicle(id) {
    id = parseInt(id);
    let data = await readFileFunction();
    data.vehicles = data.vehicles.filter(vehicle => vehicle.id !== id);
    return await writeFileFunction(data);
}

async function createVehicle({ name, description, plate, year, color, price }) {
    year = parseInt(year);
    price = parseInt(price);
    let data = await readFileFunction();

    let vehicle = {
        id: data.nextId,
        name: name,
        description: description,
        plate: plate,
        isFavorite: false,
        year: year,
        color: color,
        price: price,
        createdAt: new Date(),
    };

    data.vehicles.push(vehicle);
    data.nextId++;

    await writeFileFunction(data);
    return vehicle;
}

async function updateVehicle({
    name,
    description,
    plate,
    year,
    color,
    price,
    id,
}) {
    year = parseInt(year);
    price = parseInt(price);
    id = parseInt(id);
    let data = await readFileFunction();
    let findVehivle = data.vehicles.find(vehicle => vehicle.id === id);
    if (findVehivle === undefined) {
        throw new Error('pedido Não encontrado');
    }

    let vehicle = {
        id: findVehivle.id,
        name: name,
        description: description,
        plate: plate,
        isFavorite: findVehivle.isFavorite,
        year: year,
        color: color,
        price: price,
        createdAt: findVehivle.createdAt,
    };

    data.vehicles.map((element, i) => {
        if (element.id === id) {
            data.vehicles[i] = vehicle;
        }
    });

    await writeFileFunction(data);
    return vehicle;
}

export default {
    getVehicles,
    patchVehicles,
    deleteVehicle,
    createVehicle,
    updateVehicle,
};
