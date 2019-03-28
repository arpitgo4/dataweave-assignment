

import { Router, NextFunction, Response, } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { authCtrl, userCtrl, msgCtrl, } from '../controllers';
import { IUserModel, IDraftMessageModel, IMessageModel, IMessageRecipientModel } from 'Models';

import * as utils from '../utils/utils';


const router = Router();


router.get('/sender-id', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;

    msgCtrl.getSenderIdList(user_id)
    .then((sender_ids: Array<string>) => {
        res.status(200).json({
            data: sender_ids.map(s => {
                return {
                    type: 'sender-id',
                    attributes: s
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});


router.get('/campaign-id', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;

    msgCtrl.getCampaignIdList(user_id)
    .then((campaign_ids: Array<string>) => {
        res.status(200).json({
            data: campaign_ids.map(c => {
                return {
                    type: 'campaign-id',
                    attributes: c
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { sender_id, campaign_id, message_type, is_otp, message_id, } = req.query;

    msgCtrl.getMessages(user_id, message_id, sender_id, campaign_id, message_type, is_otp)
    .then((messages: Array<IMessageModel>) => {
        res.status(200).json({
            data: messages.map(message => {
                return {
                    type: 'message',
                    id: message.id,
                    attributes: message,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.get('/recipient/:message_id', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { message_id } = req.params;

    msgCtrl.getMessageRecipients(user_id, message_id)
    .then((recipients: Array<IMessageRecipientModel>) => {
        res.status(200).json({
            data: recipients.map(recipient => {
                return {
                    type: 'message_recipient',
                    id: recipient.id,
                    attributes: recipient,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id, } = req.user;
    const { sender_id, campaign_id, contact_list, group_names, message_type, schedule_time, message, is_otp, } = req.body.data.attributes;

    msgCtrl.createMessage(user_id, sender_id, campaign_id, message, contact_list, group_names, message_type, schedule_time, is_otp)
    .then((message: IMessageModel) => {
        res.status(200).json({
            data: {
                type: 'message',
                id: message.id,
                attributes: message,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.get('/draft', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { is_otp } = req.query;

    msgCtrl.getDrafts(user_id, is_otp)
    .then((draft_messages: Array<IDraftMessageModel>) => {
        res.status(200).json({
            data: draft_messages.map(draft_message => {
                return {
                    type: 'draft_message',
                    id: draft_message.id,
                    attributes: draft_message
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/draft', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { name, message, is_otp, } = req.body.data.attributes;

    msgCtrl.createDraft(user_id, name, message, is_otp)
    .then((draft_message: IDraftMessageModel) => {
        res.status(200).json({
            data: {
                type: 'draft_message',
                id: draft_message.id,
                attributes: draft_message
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


export default router;
