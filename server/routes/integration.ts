
import { Router, NextFunction, Response } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { msgCtrl, } from '../controllers';
import { IContact_GroupModel, IContactsModel, IContact_Group_ContactsModel, } from 'Models';

const router = Router();


router.post('/message', (req: JWTRequest, res: Response, next: NextFunction) => {

});

export default router;
