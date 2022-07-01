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
