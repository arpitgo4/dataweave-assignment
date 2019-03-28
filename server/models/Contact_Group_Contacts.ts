import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';


const Contact_Group_Contacts = sequelize_connection.define('contact_group_contacts', {
    Group_id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    contacts_id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, },
}, { freezeTableName: true , timestamps: false, });


export {
    Contact_Group_Contacts,
};
