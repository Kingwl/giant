interface GenericResponse<T> {
  status: number;
  msg: string;
  data: T;
}

export interface SkuStock {
  stock: number;
  type: number;
  ava_stock: string;
}

export interface SkuStockResponse extends GenericResponse<SkuStock> {}

export interface Shop {
  name: string;
  code: string;
}

export interface ShopListResponse extends GenericResponse<Shop[]> {}

export interface RefreshTokenResponse extends GenericResponse<string> {}

export interface ShopListOptions {
  province?: string;
  city?: string;
  area?: string;
  perPage?: number;
}

export interface Options {
  shop: ShopListOptions;

  skus: string[];
  userId: string;

  interval?: number;
  randomInterval?: number;
  maxRetry?: number;
  maxLoop?: number;
}

export type SucceedCallback = (sku: string, shop: Shop) => void;
