

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

/**
 * mapping between message and recipient contact numbers or group names.
 */
const Api_Key = sequelize_connection.define('api_key', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    api_key: { type: Sequelize.STRING, allowNull: false, },
    active: { type: Sequelize.BOOLEAN, defaultValue: false, },
    dateCreated: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false, },
    lastModified: { type: Sequelize.DATE, allowNull: true, },
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: false, },
}, { freezeTableName: true , timestamps: false, });

export {
    Api_Key,
};
