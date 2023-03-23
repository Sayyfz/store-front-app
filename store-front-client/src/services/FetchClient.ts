import { CustomResponse } from '../types/CustomResponse';
import { IHttpClient } from '../types/IHttpClient';
import { IHttpClientOptions } from '../types/IHttpClientOptions';

export class FetchClient implements IHttpClient {
    init(): void {
        // Initial setup if needed
    }

    async get(url: string, id?: number, options?: RequestInit) {
        const res = await fetch(`${url}${id ? `/${id}` : ''}`, { method: 'GET', ...options });
        return this.reformatResponse(res);
    }

    async post(url: string, body: unknown, options?: RequestInit) {
        const res = await fetch(url, {
            method: 'POST',
            body: body as BodyInit,
            ...options,
        });
        return this.reformatResponse(res);
    }

    async delete(url: string, id: number, options?: RequestInit) {
        const res = await fetch(`${url}/${id}`, { method: 'DELETE', ...options });
        return this.reformatResponse(res);
    }

    async patch(url: string, id: number, body: unknown, options?: RequestInit) {
        const res = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            body: body as BodyInit,
            ...options,
        });
        return this.reformatResponse(res);
    }

    reformatResponse(res: Response): CustomResponse {
        return {
            ...res,
            data: res.json().then(json => json),
            status: res.status,
            headers: res.headers,
            config: {},
        };
    }

    reformatOptions(options: IHttpClientOptions): RequestInit {
        const newOpt = options as RequestInit;
        return {
            ...newOpt,
            headers: newOpt.headers,
        };
    }
}
