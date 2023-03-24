export interface ProductType {
    id: string | number;
    name: string;
    price: number;
    category: string;
    images?:
        | {
              id?: string | number;
              imageUrl: string;
          }[]
        | [];
}
