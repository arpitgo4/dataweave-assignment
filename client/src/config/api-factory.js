

const API_SERVER_IP = NODE_ENV === 'production' ? '52.91.95.253:80' : '127.0.0.1:8080';

class ApiFactory {

    get(api, params) {
        let url = api.url;

        if(params) {
            Object.keys(params)
            .forEach(key => {
                const value = params[key];
                url = url.replace(`:${key}`, value);
            });
        }

        return Object.assign({}, api, { url: `${this.API_SERVER}${url}` });
    }
}

class UserApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/user`;

    API_TABLE = {
        GET_ALL_USERS: { url: `/`, type: 'GET' },
        GET_USER_BY_ID: { url: `/:id`, type: 'GET' },
        POST_USER: { url: '/', type: 'POST' },
        PUT_UPDATE_USER: { url: '/', type: 'PUT' },
        DELETE_USER: { url: '/', type: 'DELETE' },
    }
}

class AuthApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/auth`;

    API_TABLE = {
        GET_TOKEN: { url: `/token`, type: 'POST' },
    };
}

class InspectionApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/inspection`;

    API_TABLE = {
        GET_INSPECTION: { url: `/:id`, type: `GET` },
        GET_INSPECTIONS: { url: `/`, type: `GET` },
        GET_INSPECTIONS_BY_TIMESTAMPS: { url: `/:start_timestamp/:end_timestamp`, type: `GET` },
        PUT_GUEST_INSPECTIONS: { url: `/guest`, type: `PUT` },
    };
}

class MiscApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/misc`;

    API_TABLE = {
        GET_COMPANIES: { url: `/companies`, type: `GET` },
    };
}

export const userApiFactory = new UserApiFactory();
export const authApiFactory = new AuthApiFactory();
export const inspectionApiFactory = new InspectionApiFactory();
export const miscApiFactory = new MiscApiFactory();
