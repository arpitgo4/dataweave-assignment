

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

/**
 * mapping between message and recipient contact numbers or group names.
 */
const Message_Recipient = sequelize_connection.define('message_recipient', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    message_id: { type: Sequelize.BIGINT(20), allowNull: false, },
    contact_number: { type: Sequelize.STRING, allowNull: true, },
    group_name: { type: Sequelize.STRING, allowNull: true, },
    is_delivered: { type: Sequelize.BOOLEAN, default: false, },
    delivery_time: { type: Sequelize.DATE, allowNull: true, },
    dateCreated: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false, },
    lastModified: { type: Sequelize.DATE, allowNull: true, },
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: false, },
}, { freezeTableName: true , timestamps: false, });

export {
    Message_Recipient,
};
