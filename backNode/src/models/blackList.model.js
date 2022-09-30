import sequelize from 'sequelize';
import connect from '../config/Postgreconnect.js';

const BlackList = connect.define(
    'blacklist', {
        userId: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        token: {
            type: sequelize.ABSTRACT,
        }
    }, { underscored: true },
);

export default BlackList;