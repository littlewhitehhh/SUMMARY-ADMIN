// import path from 'path';

// 封装环境变量
export function wrapperEnv(envConfig: Recordable): ViteEnv {
  const ret: any = {};
  for (const key of Object.keys(envConfig)) {
    // 这个正则是干啥的？
    let realVale = envConfig[key].replace(/\\n/g, '\n');

    realVale = realVale === 'true' ? true : realVale === 'false' ? false : realVale;
    if (key === 'VITE_PORT') realVale = Number(realVale);
    if (key === 'VITE_PROXY') {
      try {
        realVale = JSON.parse(realVale);
      } catch {
        throw 'error';
      }
    }
    // console.log(key, envConfig[key]);
    // console.log(typeof envConfig[key]);
    ret[key] = realVale;
  }

  return ret;
}
