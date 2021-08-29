export interface IBanner {
  _id: string;
  code: string;
  images: any[];
}

export interface IVariant {
  _id: string;
  size: string;
  color: string;
  price: string;
  salePrice: string;
  isSale: string;
}

export interface ICategory {
  _id: string;
  code: string;
  name: string;
}

export interface IImage {
  _id: string;
  name: string;
  url: string;
  formats: any;
}

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  variants: IVariant[];
  categories: ICategory[];
  images: IImage[];
}
