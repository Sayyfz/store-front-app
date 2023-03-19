import { IHttpClient } from '../types/IHttpClient';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CustomResponse } from '../types/CustomResponse';

export class AxiosClient implements IHttpClient {
    private axiosInstace: AxiosInstance;

    constructor() {
        this.axiosInstace = axios.create();
    }

    init(options?: unknown): void {
        this.axiosInstace = axios.create(options ?? {});
    }

    async get(url: string, id?: number, options?: AxiosRequestConfig): Promise<CustomResponse> {
        const res = await this.axiosInstace.get(`${url}${id ? `/${id}` : ''}`, options);
        return this.reformatResponse(res);
    }

    async post(url: string, body: unknown, options?: AxiosRequestConfig): Promise<CustomResponse> {
        const res = await this.axiosInstace.post(url, body, options);
        return this.reformatResponse(res);
    }

    async delete(url: string, id: number, options?: AxiosRequestConfig): Promise<CustomResponse> {
        const res = await this.axiosInstace.delete(`${url}/${id}`, options);
        return this.reformatResponse(res);
    }

    async patch(
        url: string,
        id: number,
        body: unknown,
        options?: AxiosRequestConfig,
    ): Promise<CustomResponse> {
        const res = await this.axiosInstace.patch(`${url}/${id}`, body, options);
        return this.reformatResponse(res);
    }

    reformatResponse(res: AxiosResponse<any, any>) {
        return {
            ...res,
            data: res.data,
            status: res.status,
            headers: res.headers,
            config: res.config,
        };
    }
}
