import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';


const Contacts = sequelize_connection.define('contacts', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    contactEmail: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0, },
    lastModified: { type: Sequelize.DATE, allowNull: true, defaultValue: null, },
    contactName: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    contactNumber: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    version: { type: Sequelize.BIGINT(20), allowNull: false, defaultValue: 1, },
}, { freezeTableName: true , timestamps: false, });


export {
    Contacts,
};