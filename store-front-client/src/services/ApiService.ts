import { CustomResponse } from '../types/CustomResponse';
import { IApiService } from '../types/IApiService';
import { IHttpClient } from '../types/IHttpClient';
import { HttpClientFactory, HttpClientType } from './HttpClientFactory';

class ApiService implements IApiService {
    private http: IHttpClient;

    constructor(httpClientType: HttpClientType) {
        this.http = HttpClientFactory.create(httpClientType);
        this.http.init();
    }

    async get(url: string, id?: number, options?: unknown): Promise<CustomResponse> {
        return this.http.get(url, id, options);
    }

    async post(url: string, body: unknown, options?: unknown): Promise<CustomResponse> {
        return this.http.post(url, body, options);
    }

    async patch(
        url: string,
        id: number,
        body: unknown,
        options?: unknown,
    ): Promise<CustomResponse> {
        return this.http.patch(url, id, body, options);
    }

    async delete(url: string, id: number, options?: unknown): Promise<CustomResponse> {
        return this.http.delete(url, id, options);
    }
}

export default new ApiService(HttpClientType.Axios);
