

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const Message_Schedule = sequelize_connection.define('message_schedule', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    message_id: { type: Sequelize.BIGINT(20), allowNull: false, },
    schedule_time: { type: Sequelize.DATE, allowNull: false, },
    version: { type: Sequelize.BIGINT(20), defaultValue: 1 },
}, { freezeTableName: true , timestamps: false, });

export {
    Message_Schedule,
};
