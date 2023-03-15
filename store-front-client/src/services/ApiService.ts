import { CustomResponse } from '../types/CustomResponse';
import { IApiService } from '../types/IApiService';
import { IHttpClient } from '../types/IHttpClient';
import { AxiosClient } from './AxiosClient';

class ApiService implements IApiService {
    private httpOptions = {};

    constructor(private http: IHttpClient) {
        http.init(this.httpOptions);
    }

    async get(url: string, id?: number, options?: unknown): Promise<CustomResponse> {
        return this.http.get(url, id, options);
    }

    async post(url: string, body: unknown, options?: unknown): Promise<unknown> {
        return this.http.post(url, body, options);
    }

    async patch(url: string, id: number, body: unknown, options?: unknown): Promise<unknown> {
        return this.http.patch(url, id, body, options);
    }

    async delete(url: string, id: number, options?: unknown): Promise<unknown> {
        return this.http.delete(url, id, options);
    }
}

const client = new AxiosClient();
export default new ApiService(client);
