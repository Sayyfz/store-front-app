export interface IApiService {
    get(url: string, id?: number): Promise<CustomResponse>;
    post(url: string, body: unknown): Promise<CustomResponse>;
    delete(url: string, id: number): Promise<CustomResponse>;
    patch(url: string, id: number, body: unknown): Promise<CustomResponse>;
}
