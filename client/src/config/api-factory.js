

const API_SERVER_IP = API_GATEWAY;

class ApiFactory {

    get(api, params, query_params) {
        let url = api.url;

        if(params) {
            Object.keys(params)
            .forEach(key => {
                const value = params[key];
                url = url.replace(`:${key}`, value);
            });
        }

        if (query_params) {
            url += `?`;
            Object.keys(query_params)
            .forEach(key => {
                const value = query_params[key];

                if (value !== undefined)
                    url += `${key}=${encodeURIComponent(value)}&`;
            });
        }

        return Object.assign({}, api, { url: `${this.API_SERVER}${url}` });
    }
}

class ProductApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/product`;

    API_TABLE = {
        GET_PRODUCTS: { url: `/`, type: 'GET' },
        GET_DISTINCT_OPTIONS: { url: `/options`, type: 'GET' },
    }
}

export const productApiFactory = new ProductApiFactory();
