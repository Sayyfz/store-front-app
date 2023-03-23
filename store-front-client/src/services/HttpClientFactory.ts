import { IHttpClient } from '../types/IHttpClient';
import { AxiosClient } from './AxiosClient';
import { FetchClient } from './FetchClient';

export enum HttpClientType {
    Axios = 'Axios',
    Fetch = 'Fetch',
    // add more http clients here if needed
}

export class HttpClientFactory {
    static create(type: HttpClientType): IHttpClient {
        if (type === HttpClientType.Axios) {
            return new AxiosClient();
        } else if (type === HttpClientType.Fetch) {
            return new FetchClient();
        } else {
            throw new Error(`Unsupported http client type: ${type}`);
        }
        // add more cases for other http clients if needed
    }
}
