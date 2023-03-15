export interface CustomResponse {
    [key: string]: unknown;
    data: unknown;
    status: number;
    headers: { [key: string]: unknown };
    config: unknown;
}
