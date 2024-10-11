import {Api} from './Api.ts';

export const baseUrl = 'https://server-844014329852.europe-west1.run.app';

export const http = new Api({
    baseURL: baseUrl,
    headers: {
        "Prefer": "return=representation"
    }
});