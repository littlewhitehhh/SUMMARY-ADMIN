import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

export const createProxy = (proxyEnv: ProxyList) => {
  const ret: ProxyTargetList = {};
  // const relProxy = JSON.parse(proxyEnv);
  for (const [prefix, target] of proxyEnv) {
    // console.log('proxyEnv', proxyEnv);

    // console.log('prefix', prefix); // /api
    // console.log('target', target);

    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    };
  }
  // console.log('ret', ret);

  return ret;
};
