export interface CustomResponse {
    [key: string]: unknown;
    data: unknown;
    status: number;
    headers: unknown;
    config: unknown;
}
