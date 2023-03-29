export interface ProductType {
    id: string | number;
    name: string;
    price: number;
    category: string;
    images?: ImagesType;
}

export type ImagesType =
    | {
          id?: string | number;
          imageUrl: string;
      }[]
    | [];
