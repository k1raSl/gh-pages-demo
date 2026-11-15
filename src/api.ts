import getEndpoints from './server/db';

const endpoints = getEndpoints();
type ENDPOINTS = keyof typeof endpoints;
type RESPONSE_DATA = {
    greeting: string;
};

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
    let path = '';
    
    if (process.env.NODE_ENV === 'development') {
        // Локально стучимся к json-server
        path = `http://localhost:3001/api/${endpoint}`;
    } else {
        // На GitHub Pages берем статичный файл
        path = `${process.env.PUBLIC_URL}/static/db/${endpoint}.json`;
    }
    
    const response = await fetch(path);
    return await response.json();
};

type API = {
    get: {
        data: () => Promise<RESPONSE_DATA>;
    };
};

const api: API = {
    get: {
        data: () => getJson<RESPONSE_DATA>('data'),
    },
};

export type { RESPONSE_DATA, ENDPOINTS };
export default api;