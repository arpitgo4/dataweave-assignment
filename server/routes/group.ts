import { Router, NextFunction, Response } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { groupCtrl, } from '../controllers';
import { IContact_GroupModel, IContactsModel, IContact_Group_ContactsModel, } from 'Models';


const router = Router();


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;

    groupCtrl.getGroups(user_id)
    .then((groups: Array<IContact_GroupModel>) => {
        res.status(200).json({
            data: groups.map(group => {
                return {
                    type: 'group',
                    id: group.id,
                    attributes: group,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id, } = req.user;
    const group_data = req.body.data.attributes;
    group_data.user_id = user_id;

    groupCtrl.createGroup(group_data)
    .then((group: IContact_GroupModel) => {
        res.status(200).json({
            data: {
                type: 'group',
                id: group.id,
                attributes: group,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.put('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const group_data = req.body.data.attributes;

    groupCtrl.renameGroup(group_data)
    .then((group: IContact_GroupModel) => {
        res.status(200).json({
            data: {
                type: 'group',
                id: group.id,
                attributes: group,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.delete('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const group_id = req.body.data.attributes.id;

    groupCtrl.deleteGroup(group_id)
    .then((group: IContact_GroupModel) => {
        res.status(200).json({
            data: {
                type: 'group',
                id: group.id,
                attributes: group,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.get('/contact/:group_name', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { group_name } = req.params;

    groupCtrl.getContacts(user_id, group_name)
    .then((contacts: Array<IContactsModel>) => {
        res.status(200).json({
            data: contacts.map(contact => {
                return {
                    type: 'contact',
                    id: contact.id,
                    attributes: contact,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/contact', (req: JWTRequest, res: Response, next: NextFunction) => {
    const contact_list = req.body.data;

    groupCtrl.addContact(contact_list)
    .then((contacts: Array<IContactsModel>) => {
        res.status(200).json({
            data: contacts.map(contact => {
                return {
                    type: 'contact',
                    attributes: contact,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.put('/contact', (req: JWTRequest, res: Response, next: NextFunction) => {
    const {id, contact_name, contact_email, contact_number, group_name} = req.body.data.attributes;

    groupCtrl.updateContact(contact_name, contact_email, contact_number, group_name, id)
    .then((group: IContactsModel) => {
        res.status(200).json({
            data: {
                type: 'contact',
                attributes: group,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.delete('/contact', (req: JWTRequest, res: Response, next: NextFunction) => {
    const {id, group_name} = req.body.data.attributes;

    groupCtrl.deleteContact(id, group_name)
    .then((group: IContactsModel) => {
        res.status(200).json({
            data: {
                type: 'contact',
                attributes: group,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

export default router;
