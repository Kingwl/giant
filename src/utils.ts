import CryptoJS from 'crypto-js'

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function createCallIntervalControl(
  interval = 2000,
  maxRetry = 3,
  randomInterval = 1000
) {
  let lastCalled = Date.now();

  return function factory<T extends (...args: any[]) => any>(fn: T) {
    return async function wrapper(
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (Date.now() - lastCalled < interval) {
        await sleep(interval + Math.random() * randomInterval);
      }

      let retry = 0;
      while (true) {
        try {
          lastCalled = Date.now();
          return fn(...args);
        } catch (e) {
          log(`出错了, 重试第 ${retry + 1} 次`);
          if (retry++ >= maxRetry) {
            throw e;
          }
        }
      }
    };
  };
}

export function log(...args: any[]) {
  const now = new Date().toLocaleString();
  console.log("\x1b[36m%s\x1b[0m", `[${now}]`, ...args);
}

export function tryParseNumber(str: string | undefined) {
  if (str) {
    return parseInt(str, 10);
  }
}

export function parseList(str: string | undefined) {
  if (str) {
    return str.split(",");
  }
  return [];
}
// import CryptoJS from  'crypto-js';
// 密法：string-字段  code-约定的密钥    operation 默认false表示加，传入true表示解
export function decrypt(string: string, code: string, operation: boolean) {
  code = CryptoJS.MD5(code).toString()
  var iv = CryptoJS.enc.Utf8.parse(code.substring(0, 16))
  var key = CryptoJS.enc.Utf8.parse(code.substring(16))
  if (operation) {
    let decrypt = CryptoJS.AES.decrypt(string, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
    return decrypt
  }
  let result = CryptoJS.AES.encrypt(string, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return result
}
// 处理返回字符串截取方法
export function dealStrSub(val: string) {
  let numA = Math.ceil(val.length / 2);
  let str1 = val.substring(numA, val.length);
  let str2 = val.substring(0, numA);
  let str3 = str1.substring(1, 3);
  let str3_1 = str1.substring(1, 2);
  let str4 = str1.substring(4, 6);
  let str4_1 = str1.substring(4, 5);
  if (str3_1 === '0') {
    str3 = str1.substring(2, 3)
  }
  if (str4_1 === '0') {
    str4 = str1.substring(5, 6)
  }
  parseInt
  let str7 = str1.substring(6, str1.length)
  let str5 = str2 + str7;
  let str6 = str5.substring(parseInt(str4, 10), str5.length - parseInt(str3, 10))
  // console.log(str6)
  return str6
}
