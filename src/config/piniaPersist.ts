import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

/**
 * @description pinia 持久化参数
 * @params {String} key 储存到持久化的name
 * @params {Array}  paths 需要持久化的 store name
 * @return persist
 */

const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    // storage:SessionStorge
    paths
  };
  return persist;
};

export default piniaPersistConfig;
