import {Api} from './Api.ts';

export const baseUrl = 'http://localhost:5555';

export const http = new Api({
    baseURL: baseUrl,
    headers: {
        "Prefer": "return=representation"
    }
});