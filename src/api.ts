import axios from "axios";
import FormData from "form-data";
import type {
  SkuStockResponse,
  ShopListOptions,
  ShopListResponse,
} from "./types";

export async function getSkuStock(sku: string, shopno: string, userId: string) {
  const formData = new FormData();
  formData.append("sku", sku);
  formData.append("shopno", shopno);
  formData.append("user_id", userId);

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/sku_stock",
    formData
  );
  return resp.data as SkuStockResponse;
}

export async function getShopList(page: number, options: ShopListOptions) {
  const { province, city, area, perPage = 10 } = options;
  const formData = new FormData();
  if (province) {
    formData.append("province", province);
  }
  if (city) {
    formData.append("city", city);
  }
  if (area) {
    formData.append("area", area);
  }
  formData.append("per_page", perPage.toString());
  formData.append("page", page.toString());

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/store_list",
    formData
  );
  return resp.data as ShopListResponse;
}
