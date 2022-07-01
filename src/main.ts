import "dotenv/config";
import { create } from "./index";
import type { Options } from "./types";
import { log, parseList, tryParseNumber } from "./utils";

function loadOptions(): Options {
  const skus = process.env.skus;
  const userId = process.env.userId;
  const province = process.env.province;
  const city = process.env.city;
  const area = process.env.area;
  const perPage = process.env.perPage;
  const interval = process.env.interval;
  const maxRetry = process.env.maxRetry;
  const randomInterval = process.env.randomInterval;

  if (!userId) {
    throw new Error("userId is required");
  }

  return {
    shop: {
      province,
      city,
      area,
      perPage: tryParseNumber(perPage),
    },
    skus: parseList(skus),
    userId,
    interval: tryParseNumber(interval),
    maxRetry: tryParseNumber(maxRetry),
    randomInterval: tryParseNumber(randomInterval),
  };
}

async function main() {
  const options = loadOptions();
  log("加载配置完成");

  const { loadShopList, pollSkuStatus } = await create(options, (sku, shop) => {
    console.error(`${shop.name} ${sku} 库存有货!!!`);
  });
  const shops = await loadShopList();
  await pollSkuStatus(shops);
}

main();
