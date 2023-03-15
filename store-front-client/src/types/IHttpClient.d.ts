export interface IHttpClient {
    init(options?: unknown): void;

    get(url: string, id?: number, options: unknown): Promise<CustomResponse>;
    post(url: string, body: unknown, options: unknown): Promise<CustomResponse>;
    delete(url: string, id: number, options: unknown): Promise<CustomResponse>;
    patch(url: string, id: number, body: unknown, options: unknown): Promise<CustomResponse>;
}
