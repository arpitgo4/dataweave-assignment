
import chalk from 'chalk';
import sgMail from '@sendgrid/mail';

import { CustomError } from 'Interfaces';

const { SENDGRID_API_KEY, } = process.env;



sgMail.setApiKey(SENDGRID_API_KEY);
const FROM_EMAIL_ID = `accounts@ris.io`;

const sendMail = (to_email_id: string, subject: string, text: string, html: string, from_email_id: string = FROM_EMAIL_ID): Promise<any> => {

    if (!to_email_id) {
        console.log(chalk.red(`[sendMail] no email id provided to send email to: ${to_email_id}`));
        return Promise.reject({
            message: `no email id provided to send email to: ${to_email_id}`
        });
    }

    const mail = {
        to: to_email_id,
        from: from_email_id,
        subject,
        text,
        html
    };

    return sgMail.send(mail);
};

const sendEmailVerificationMail = (to_email_id: string, verification_url: string): Promise<any> => {
    const style = `width: 40px; height: 20px;
                    border: 1px solid black;
                    background-color: red; display: block;`;
    const text = `RIS Email Verification`;
    const html = `
    <div>
        <h2>RIS Email Verification</h2>
        Click on the link to verify your email id: <a href="${verification_url}" target="_blank">${verification_url}</a>
    </div>`;
    const subject = `RIS Email Verification`;

    return sendMail(to_email_id, subject, text, html)
    .then(() => {
        console.log(chalk.green(`[sendVerificationMail] Email Verification Email Sent to ${to_email_id}`));
        return Promise.resolve();
    })
    .catch((err: CustomError) => {
        console.log(chalk.red(`[sendVerificationMail] Email Verification Email not sent to ${to_email_id}, error: ${err.message}`));
        return Promise.resolve();
    });
};


const sendPasswordResetVerificationMail = (to_email_id: string, reset_url: string): Promise<any> => {
    const style = `width: 40px; height: 20px;
                    border: 1px solid black;
                    background-color: red; display: block;`;
    const text = `RIS Password Reset`;
    const html = `
    <div>
        <h2>RIS Password Reset</h2>
        Click on the link to reset your password: <a href="${reset_url}" target="_blank">${reset_url}</a>
    </div>`;
    const subject = `RIS Password Reset`;

    return sendMail(to_email_id, subject, text, html)
    .then(() => {
        console.log(chalk.green(`[sendPasswordResetMail] Password Reset Email Sent to ${to_email_id}`));
        return Promise.resolve();
    })
    .catch((err: CustomError) => {
        console.log(chalk.red(`[sendPasswordResetMail] Password Reset Email not sent to ${to_email_id}, error: ${err.message}`));
        return Promise.resolve();
    });
};

// const _findUserEmailHighOrderFunc = (sendMailFunc: Function) => {

//     return (user_id: string, ...restArgs) => {
//         const { findUser } = require('../controllers');

//         return findUser(user_id, { 'kyc': true })
//         .then((user: IUserModel) => {
//             const { kyc } = user;
//             if (kyc && kyc.email) {
//                 const { email, status } = kyc.email;
//                 if (email && status === constants.KYC_METHODS_STATUS.APPROVED) {
//                     return sendMailFunc(email, ...restArgs);
//                 } else {
//                     console.log(chalk.red(`No email id found for ${user_id}`));
//                     return Promise.resolve();
//                 }
//             } else {
//                 console.log(chalk.red(`No email id found for ${user_id}`));
//                 return Promise.resolve();
//             }
//         })
//     };
// };


export default {
    sendEmailVerificationMail,
    sendPasswordResetVerificationMail
};