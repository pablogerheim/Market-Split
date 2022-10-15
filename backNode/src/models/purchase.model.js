import sequelize from 'sequelize';
import connect from '../config/Postgreconnect.js';

const Purchase = connect.define(
    'purchases', {
        purchaseId: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: sequelize.STRING,
            allowNull: false,
        },
        timestamp: {
            type: sequelize.DATE,
            allowNull: false,
        },
        active: {
            type: sequelize.BOOLEAN,
            allowNull: false,
        },
        summary: {
            type: sequelize.ABSTRACT,
        },
    }, { underscored: true },
);

export default Purchase;