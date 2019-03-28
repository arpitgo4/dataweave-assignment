

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const User_Address = sequelize_connection.define('user_address', {
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    FK_addressId: { type: Sequelize.BIGINT(20), allowNull: false, unique: true, },
}, { freezeTableName: true , timestamps: false, });

export {
    User_Address,
};