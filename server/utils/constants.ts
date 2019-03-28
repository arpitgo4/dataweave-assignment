
const { API_GATEWAY, } = process.env;


const EMAIL_VERIFICATION_URL = (email_uuid: string, email: string): string => `http://${API_GATEWAY}/account/${email_uuid}/${email}`;
const PASSWORD_RESET_URL = (password_uuid: string, email: string): string => `http://${API_GATEWAY}/pwdreset/${password_uuid}/${email}`;

const USER_JWT_TOKEN_TTL = '10y';

export {
    EMAIL_VERIFICATION_URL,
    USER_JWT_TOKEN_TTL,
    PASSWORD_RESET_URL,
};
