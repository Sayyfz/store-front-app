import { IHttpClient } from '../types/IHttpClient';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AxiosClient implements IHttpClient {
    private axiosInstace: AxiosInstance;

    constructor() {
        this.axiosInstace = axios.create();
    }

    init(options?: unknown): void {
        this.axiosInstace = axios.create(options ?? {});
    }

    async get(url: string, id?: number, options?: AxiosRequestConfig): Promise<unknown> {
        const res = await this.axiosInstace.get(`${url}${id ? `/${id}` : ''}`, options);
        return res.data;
    }

    async post(url: string, body: unknown, options?: AxiosRequestConfig): Promise<unknown> {
        const res = await this.axiosInstace.post(url, body, options);
        return res.data;
    }

    async delete(url: string, id: number, options?: AxiosRequestConfig): Promise<unknown> {
        const res = await this.axiosInstace.delete(`${url}/${id}`, options);
        return res.data;
    }

    async patch(url: string, body: unknown, options?: AxiosRequestConfig): Promise<unknown> {
        const res = await this.axiosInstace.patch(url, options);
        return res.data;
    }
}
