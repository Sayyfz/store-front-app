import { IHttpClient } from '../types/IHttpClient';
import axios, { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

import { CustomResponse } from '../types/CustomResponse';

export class AxiosClient implements IHttpClient {
    private axiosInstance;

    constructor(options?: CreateAxiosDefaults) {
        this.axiosInstance = axios.create(options);
    }

    init(): void {
        // Initial setup if needed
    }

    async get(url: string, id?: number, options?: AxiosRequestConfig) {
        const res = await this.axiosInstance.get(`${url}${id ? `/${id}` : ''}`, options);
        return this.reformatResponse(res);
    }

    async post(url: string, body: unknown, options?: AxiosRequestConfig) {
        const res = await this.axiosInstance.post(url, body, {
            ...options,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return this.reformatResponse(res);
    }

    async delete(url: string, id: number, options?: AxiosRequestConfig) {
        const res = await this.axiosInstance.delete(`${url}/${id}`, options);
        return this.reformatResponse(res);
    }

    async patch(url: string, id: number, body: unknown, options?: AxiosRequestConfig) {
        const res = await this.axiosInstance.patch(`${url}/${id}`, body, options);
        return this.reformatResponse(res);
    }

    reformatResponse(res: AxiosResponse<any, any>): CustomResponse {
        return {
            ...res,
            data: res.data,
            status: res.status,
            headers: res.headers,
            config: res.config,
        };
    }
}
