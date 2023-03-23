export interface IApiService {
    get(url: string, id?: number): Promise<T>;
    post(url: string, body: unknown): Promise<T>;
    delete(url: string, id: number): Promise<T>;
    patch(url: string, id: number, body: unknown): Promise<T>;
}
