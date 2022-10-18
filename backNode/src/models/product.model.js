import sequelize from 'sequelize';
import connect from '../config/Postgreconnect.js';

const Product = connect.define(
    'products', {
        productId: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: sequelize.STRING,
            allowNull: false,
        },
        participants: {
            type: sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize.STRING,
            allowNull: false,
        },
        purchase: {
            type: sequelize.STRING,
            allowNull: false,
        },
    }, { underscored: true },
);

export default Product;