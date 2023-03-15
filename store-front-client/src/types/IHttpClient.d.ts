export interface IHttpClient {
    init(options?: unknown): void;

    get(url: string, id?: number, options: unknown): Promise<unknown>;
    post(url: string, body: T, options: unknown): Promise<T>;
    delete(url: string, id: number, options: unknown): Promise<unknown>;
    patch(url: string, body: T, options: unknown): Promise<T>;
}
