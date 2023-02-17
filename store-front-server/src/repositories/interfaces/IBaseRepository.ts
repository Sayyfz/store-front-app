export default interface IBaseRepository<T> {
    index(): Promise<T[]>;
    show(id: string): Promise<T>;
    create(item: T): Promise<T>;
    delete(id: string): Promise<T>;
    update(id: string, newItem: T): Promise<T>;
}
