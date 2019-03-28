import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';


const Contact_Group = sequelize_connection.define('contact_group', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0, },
    lastModified: { type: Sequelize.DATE, allowNull: true, defaultValue: null, },
    name: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    version: { type: Sequelize.BIGINT(20), allowNull: false, defaultValue: 1, },
    FK_userId: { type: Sequelize.BIGINT(20), allowNull: true, primaryKey: true, },
    groupId: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
}, { freezeTableName: true , timestamps: false, });


export {
    Contact_Group,
};
