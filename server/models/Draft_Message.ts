

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const Draft_Message = sequelize_connection.define('draft_message', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false, },
    lastModified: { type: Sequelize.DATE, allowNull: true, },
    msg: { type: Sequelize.STRING, allowNull: true, unique: true, },
    is_otp: { type: Sequelize.BOOLEAN, defaultValue: false, },
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: false, },
    version: { type: Sequelize.BIGINT(20), defaultValue: 1 },
}, { freezeTableName: true , timestamps: false, });

export {
    Draft_Message,
};
