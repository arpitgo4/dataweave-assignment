

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const Message = sequelize_connection.define('message', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    coding: { type: Sequelize.STRING, allowNull: true },
    message: { type: Sequelize.STRING, allowNull: true, },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false, },
    is_otp: { type: Sequelize.BOOLEAN, defaultValue: false, },
    lastModified: { type: Sequelize.DATE, allowNull: true, },
    messageType: { type: Sequelize.STRING, allowNull: true, },
    priority: { type: Sequelize.INTEGER, default: 0, },
    version: { type: Sequelize.BIGINT(20), defaultValue: 1 },
    senderId: { type: Sequelize.STRING, allowNull: false, },
    campaignId: { type: Sequelize.STRING, allowNull: true, },
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: false, },
}, { freezeTableName: true , timestamps: false, });

export {
    Message,
};
