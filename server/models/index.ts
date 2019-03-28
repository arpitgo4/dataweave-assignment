
/**
 * Model layer.
 *
 * Interacts with MongoDB.
 */

import sequelize from '../config/mysql';

import { User, } from './User';
import { Address, } from './Address';
import { User_Address, } from './User_Address';
import { Contacts, } from './Contacts';
import { Contact_Group } from './Contact_Group';
import { Contact_Group_Contacts } from './Contact_Group_Contacts';

import { Message, } from './Message';
import { Draft_Message } from './Draft_Message';
import { Message_Schedule } from './Message_Schedule';
import { Message_Recipient, } from './Message_Recipient';
import { Campaign } from './Campaign';
import { Api_Key, } from './Api_Key';
import { Ip_Api_Key, } from './Ip_Api_Key';

export {
    User,
    Address,
    User_Address,
    Contacts,
    Contact_Group,
    Contact_Group_Contacts,
    sequelize,
    Message,
    Draft_Message,
    Message_Schedule,
    Campaign,
    Message_Recipient,
    Api_Key,
    Ip_Api_Key,
};
