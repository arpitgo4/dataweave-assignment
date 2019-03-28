
export const JWT_TOKEN_HEADER = 'X-Token';

export const DEFAULT_PAGE_SIZE = 10;

export const LS_JWT_TOKEN_KEY = `token`;
export const LS_USER_KEY = `user`;

export const USER_ROLES = {
    GUEST_USER: 'GUEST User',
    CLIENT_USER: 'Client User',
    SUPER_USER: 'Super User',
    ADMIN_GUEST: 'GUEST Admin',
    ADMIN: 'Admin',
};

const APP_BASE = `/dashboard`;
export const ROUTES = {
    APP_LAYOUT: APP_BASE,
    USER_MANAGEMENT_LAYOUT: `${APP_BASE}/user`,
    INSPECTION_LAYOUT: `${APP_BASE}/inspections`,
    IMAGERY_LAYOUT: `${APP_BASE}/imagery`,
};
