import axios from "axios";
import FormData from "form-data";
import type {
  SkuStockResponse,
  ShopListOptions,
  ShopListResponse,
  RefreshTokenResponse,
} from "./types";
import { decrypt, dealStrSub } from "./utils";

export async function getSkuStock(sku: string, shopno: string, userId: string) {
  const formData = new FormData();
  formData.append("sku", sku);
  formData.append("shopno", shopno);
  formData.append("user_id", userId);

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/sku_stock",
    formData
  );
  if (resp.data.status == 1) {
    let dealStr = dealStrSub(resp.data.data)
    // 展示存量
    let result = JSON.parse(decrypt(dealStr, 'nKB6qnkQimMG5Pv1CCPfz205YgQurfcZs1kZuuDtyim8EXmR', true))
    resp.data.data = result
    // result.type
    // result.ava_stock
    // result.stock
    // //是否限量
    // if(_this.resultString.type == 1 ){
    //   _this.goodsDecision.islimitbuy = 1;
    //   _this.goodsDecision.ava_stock = _this.resultString.ava_stock;
    // } else {
    //   _this.goodsDecision.islimitbuy = 0;
    //   _this.goodsDecision.ava_stock = 0;
    // }
  }
  return resp.data as SkuStockResponse;
}

// sku: 2251101224,2251101424,2251101324,2251101124
// province:110000, city: 1, area：空
// perpage=10
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

export async function refreshToken(token: string) {
  const formData = new FormData();
  formData.append('token', token);

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/login/refresh_token",
    formData
  )
  return resp.data as RefreshTokenResponse;
}
