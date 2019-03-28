
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';

import * as constants from '../utils/constants';
import * as utils from '../utils/utils';

import {

} from './index';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

import {
    Draft_Message,
    Message,
    Message_Schedule,
    Message_Recipient,
} from '../models';

import { IUserModel, IDraftMessageModel, IMessageModel, IMessageRecipientModel, IMessageSchedule } from 'Models';


export const getDrafts = (user_id: number, is_otp: string): Promise<Array<IDraftMessageModel>> => {
    return Draft_Message.findAll({ where: { FK_userId: user_id, is_otp: (is_otp === 'true') } })
    .then((draft_messages: Array<IDraftMessageModel>) => {
        if (!draft_messages)
            return [];

        return draft_messages;
    });
};

export const createDraft = (user_id: number, name: string, message: string, is_otp: string): Promise<IDraftMessageModel> => {
    return Draft_Message.create({
        FK_userId: user_id,
        msg: message,
        name,
        is_otp: (is_otp === 'true'),
    });
};

export const getSenderIdList = (user_id: number): Promise<Array<string>> => {
    return Message.findAll({
        where: { FK_userId: user_id },
        attributes: [ 'senderId' ],
        group: ['senderId'],
    });
};


export const getCampaignIdList = (user_id: number): Promise<Array<string>> => {
    return Message.findAll({
        where: { FK_userId: user_id },
        attributes: [ 'campaignId' ],
        group: ['campaignId'],
    });
};

export const getMessages = (user_id: number, message_id: number, sender_id: string, campaign_id: string, message_type: string, is_otp: string): Promise<Array<IMessageModel>> => {
    // write a join query with message and message_recipient table for full info.
    const query: any = { FK_userId: user_id, is_otp: (is_otp === 'true'), };
    if (sender_id)
        query.senderId = sender_id;
    if (campaign_id)
        query.campaignId = campaign_id;
    if (message_type)
        query.messageType = message_type;
    if (message_id)
        query.id = Number(message_id);

    return Message.findAll({
        where: query,
    });
};

export const getMessageRecipients = (user_id: number, message_id: number) => {
    return Message_Recipient.findAll({ where: { FK_userId: user_id, message_id, } });
};

export const createMessage = (user_id: number, sender_id: string, campaign_id: string, message_content: string, contact_list: Array<number>, group_names: Array<string>, message_type: number, schedule_time: string, is_otp: string) => {
    const message = {
        FK_userId: user_id,
        senderId: sender_id,
        campaignId: campaign_id,
        messageType: message_type,
        message: message_content,
        is_otp,
    };

    return Message.create(message)
    .then((message: IMessageModel) => {
        let message_schedule_promise = Promise.resolve();
        if (schedule_time)
            message_schedule_promise = Message_Schedule.create({
                message_id: message.id,
                schedule_time,
            });

        const contact_list_promises = contact_list.map(contact => {
            return Message_Recipient.create({
                message_id: message.id,
                contact_number: contact,
                FK_userId: user_id,
            });
        });

        const group_names_promises = group_names.map(group_name => {
            return Message_Recipient.create({
                message_id: message.id,
                group_name,
                FK_userId: user_id,
            });
        });

        return Promise.all([
            message,
            message_schedule_promise,
            ...contact_list_promises,
            ...group_names_promises,
        ]);
    })
    .then(([ message, message_schedule, message_recipients ]: [ IMessageModel, IMessageSchedule, Array<IMessageRecipientModel> ]) => {
        return message;
    });

};
