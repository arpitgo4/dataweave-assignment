

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const Address = sequelize_connection.define('address', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    address1: { type: Sequelize.STRING, allowNull: false, },
    address2: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    city: { type: Sequelize.STRING, allowNull: false, },
    country: { type: Sequelize.STRING, allowNull: false, },
    postalCode: { type: Sequelize.STRING, allowNull: false, },
    state: { type: Sequelize.STRING, allowNull: false, },
    street: { type: Sequelize.STRING, allowNull: false, },
    version: { type: Sequelize.BIGINT(20), allowNull: false, defaultValue: 1, },
}, { freezeTableName: true , timestamps: false, });

export {
    Address,
};