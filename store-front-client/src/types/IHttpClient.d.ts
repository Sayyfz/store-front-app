import { CustomResponse } from './CustomResponse';

export interface IHttpClient {
    init(options?: unknown): void;

    get(url: string, id?: number, options: unknown): Promise<T>;
    post(url: string, body: unknown, options: unknown): Promise<T>;
    delete(url: string, id: number, options: unknown): Promise<T>;
    patch(url: string, id: number, body: unknown, options: unknown): Promise<T>;

    private reformatResponse(res: unknown): CustomResponse;
}
