export interface IApiService {
    get(url: string, id?: number): Promise<unknown>;
    post(url: string, body: T): Promise<T>;
    delete(url: string, id: number): Promise<unknown>;
    patch(url: string, body: T): Promise<T>;
}
