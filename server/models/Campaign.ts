

import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';

const Campaign = sequelize_connection.define('campaign', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    campaignId: { type: Sequelize.STRING, allowNull: true, },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false, },
    lastModified: { type: Sequelize.DATE, allowNull: true, },
    campaignName: { type: Sequelize.STRING, allowNull: true, },
    priority: { type: Sequelize.INTEGER, allowNull: true, },
    version: { type: Sequelize.BIGINT(20), defaultValue: 1 },
    FK_groupId: { type: Sequelize.BIGINT(20), allowNull: true, },
}, { freezeTableName: true , timestamps: false, });

export {
    Campaign,
};