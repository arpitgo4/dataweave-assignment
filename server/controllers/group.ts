import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';

import uuid from 'node-uuid';

import {
    Contacts,
    Contact_Group_Contacts,
    Contact_Group,
    sequelize,
} from '../models';
import { IContactsModel, IContact_Group_ContactsModel, IContact_GroupModel } from 'Models';

import * as utils from '../utils/utils';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];


export const getGroup = (group_name: string): Promise<IContact_GroupModel> => {
    return Contact_Group.find({ where: { name: group_name, } })
    .then((group: IContact_GroupModel) => {
        if (!group)
            return Promise.reject({ message: `group does not exists` });

        return group;
    });
};

export const getGroups = (user_id: number): Promise<Array<IContact_GroupModel>> => {
    return Contact_Group.findAll({ where: { FK_userId: user_id } });
};

export const createGroup = (group_data: any): Promise<IContact_GroupModel> => {
    const contact_group = {
        name: group_data.name,
        groupId: uuid.v4(),
        FK_userId: group_data.user_id
    };
    return Contact_Group.findOne({where: {name: group_data.name}})
    .then((group: IContact_GroupModel) => {
        if (group)
            return Promise.reject({message: 'Group already exist'});

        return Promise.resolve(Contact_Group.create(contact_group));
    });
};

export const renameGroup = (group_data: any): Promise<IContact_GroupModel> => {
    return Contact_Group.findOne({where: {id: group_data.id}})
    .then((group: IContact_GroupModel) => {
        if (!group)
            return Promise.reject({message: 'Group does not exist'});

        group_data.lastModified = new Date();
        return Contact_Group.update(group_data, {where: {id: group_data.id}})
        .then(() => Contact_Group.findOne({where: {id: group_data.id}}));
    });
};

export const deleteGroup = (group_id: any): Promise<IContact_GroupModel> => {
    return Contact_Group.findOne({where: {id: group_id}})
    .then((group: IContact_GroupModel) => {
        if (!group)
            return Promise.reject({message: 'Group does not exist'});

        return Contact_Group.destroy({where: {id: group_id}})
        .then(() => group);
    });
};


export const getContacts = (user_id: number, group_name: string) => {
    return getGroup(group_name)
    .then((group: IContact_GroupModel) => {
        return Contact_Group_Contacts.findAll({ where: { Group_id: group.id } });
    })
    .then((group_contacts: Array<IContact_Group_ContactsModel>) => {
        const contact_ids = group_contacts.map(group_contact => group_contact.contacts_id);
        return Contacts.findAll({ where: { id: contact_ids } });
    })
    .then((contacts: Array<IContactsModel>) => {
        console.log(contacts);
        if (!contacts)
            return [];

        return contacts;
    });
};

// export const addContact = (contact_name, contact_email, contact_number, group_name): Promise<IContactsModel> => {
//     const contact_details = {
//         contactName: contact_name,
//         contactEmail: contact_email,
//         contactNumber: contact_number,
//         groupName: group_name,
//     };

//     let _group_ = undefined;
//     let _contact_ = undefined;
    
//     return Contact_Group.findOne({where: {name: contact_details.groupName}})
//     .then((group: IContact_GroupModel) => {
//         //global veriable
//         _group_ = group;
//         if (!group)
//             return Promise.reject({message: "Group does not exist"});

//         return Contacts.create(contact_details);
//     })
//     .then((contact: IContact_GroupModel) => {
//         _contact_ = contact;
//         const contact_group = {
//             contacts_id: contact.id,
//             Group_id: _group_.id
//         };        
//         return Contact_Group_Contacts.create(contact_group);
//     })
//     .then(() => _contact_);
// }

export const contactCall = (data: any): Promise<IContact_GroupModel> => {

    let _group_ = undefined;
    let _contact_ = undefined;

    return Contact_Group.findOne({where: {name: data.name}})
    .then((group: IContact_GroupModel) => {
        // global variable
        _group_ = group;

        if (!group)
            return Promise.reject({message: 'Group does not exist'});

        return Contacts.create(data);
    })
    .then((contact: IContact_GroupModel) => {
        _contact_ = contact;

        const contact_group = {
            contacts_id: contact.id,
            Group_id: _group_.id
        };
        return Contact_Group_Contacts.create(contact_group);
    })
    .then(() => _contact_);
};

export const addContact = (data: any) => {
    console.log(data);
    var length = data.length;
    const promises_arr = [];
    for(var i = 0; i<length;i++){
        var group1 = {
            contactName: data[i].attributes['contact_name'],
            contactEmail: data[i].attributes['contact_email'],
            contactNumber: data[i].attributes['contact_number'],
            name: data[i].attributes['group_name']
        }
        const promise = contactCall(group1);
        promises_arr.push(promise);
    }

    return Promise.all(promises_arr);
}

export const updateContact = (contact_name, contact_email, contact_number, group_name, id): Promise<IContactsModel> => {
    const contact_details = {
        id: id,
        contactName: contact_name,
        contactEmail: contact_email,
        contactNumber: contact_number,
        lastModified: null,
        groupName: group_name,
    };

    return Contact_Group.findOne({where: {name: group_name}})
    .then((group: IContact_GroupModel) => {
        if (!group)
            return Promise.reject({message: 'Group does not exist'});

        return Contacts.findOne({where: {id: id}})
        .then((contact: IContactsModel) => {
            if (!contact)
                return Promise.reject({message: 'Contact not found'});
            contact_details.lastModified = new Date();
            return Contacts.update(contact_details, {where: {id: id}});
        });
    })
    .then(() => Contacts.findOne({where: {id: id}}));
};

export const deleteContact = (id, group_name): Promise<IContactsModel> => {
    let _contact_ = undefined;
    return Contact_Group.findOne({where: {name: group_name}})
    .then((group: IContact_GroupModel) => {
        if (!group)
            return Promise.reject({message: 'Group does not exist'});

        return Contacts.findOne({where: {id: id}})
        .then((contact: IContactsModel) => {
            if (!contact)
                return Promise.reject({message: 'Contact not found'});

            _contact_ = contact;
            return Promise.all([
                Contact_Group_Contacts.destroy({where: {contacts_id: id}}),
                Contacts.destroy({where: {id: id}})
            ]);
        });
    })
    .then(() => _contact_);
};
