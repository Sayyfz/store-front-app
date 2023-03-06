export class Order {
    id?: string;
    user_id: string;
    status: string;

    constructor(user_id: string, status: string) {
        this.user_id = user_id;
        this.status = status;
    }
}
