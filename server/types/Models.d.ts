

export interface IUserModel {
    id: number;
    userId: string;
    username: string;
    password: string;
    emailVerificationUUID: string;
    mobileVerificationUUID: string;
    forgotPasswordUUID: string;
    isVerifiedEmail: boolean;
    isVerifiedMobile: boolean;
}

export interface IAddressModel {
    id: number;
    address1: string;
    address2: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
    version: number;
}

export interface IUser_AddressModel {
    FK_userId: number;
    FK_addressId: number;
}

export interface IMessageModel {
    id: number;
    coding: string;
    message: string;
    dateCreated: string;
    isDeleted: boolean;
    lastModified: string;
    messageType: string;
    priority: number;
    version: number;
    senderId: string;
    campaignId: string;
    FK_userId: number;
}

export interface IMessageRecipientModel {
    id: number;
    message_id: number;
    contact_number: string;
    group_name: string;
    is_delivered: boolean;
    delivery_time: string;
    dateCreated: string;
    isDeleted: boolean;
    lastModified: string;
    FK_userId: number;
}

export interface IMessageSchedule {
    id: number;
    message_id: number;
    schedule_time: string;
    version: number;
}

export interface IDraftMessageModel {
    id: number;
    name: string;
    dateCreated: string;
    isDeleted: boolean;
    lastModified: string;
    msg: string;
    FK_userId: number;
    version: number;
}
export interface IContact_Group_ContactsModel {
    Group_id: number;
    contacts_id: number;
}

export interface IContact_GroupModel {
    id: number,
    name: string,
    version: number,
    FK_userId: number,
    groupId: string,
}

export interface IContactsModel {
    id: number,
    contactEmail: string,
    contactName: string,
    contactNumber: string,
    version: number,
}

export interface IApiKeyModel {
    id: number;
    api_ket: string;
    active: boolean;
    dateCreated: string;
    isDeleted: boolean;
    lastModified: string;
    FK_userId: number;
}

export interface IApiKeyIpModel {
    id: number;
    api_key_id: number;
    ip_address: string;
    dateCreated: string;
    isDeleted: boolean;
    lastModified: string;
    FK_userId: number;
}
