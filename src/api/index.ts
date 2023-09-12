import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
// import md5 from 'js-md5';
import { ResultData } from './types/index';
import { useUserStore } from '@/store/modules/uers';
// import { ResultEnum } from '@/enums/httpsEnums';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
}

// const instance = axios.create({
//   timeout: 2000,
//   baseURL: import.meta.env.VITE_API_URL as string,
//   withCredentials: true
// });
// export default instance;

// export const test = () => {
//   // console.log('test');

//   instance
//     .post('/geeker/login', {
//       username: 'admin',
//       password: md5('123456')
//     })
//     .then(res => {
//       console.log(res);
//     });
// };

// export const test2 = () => {
//   // console.log('test');

//   instance.get('/geeker/menu/list').then(res => {
//     console.log(res);
//   });
// };

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000,
  withCredentials: true //是否跨域？
};

// 封装一个class 更舒服一些

class HttpRequest {
  service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验（JWT）： 接受服务器返回的token，存储到pinia/vuex/本地存储当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore();
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', userStore.token);
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     * 服务器返回信息 -> [拦截器统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;

        // 登录失效
        // if (data.code == '404') {
        // }

        // 登录成功

        return data;
      },
      error => {
        Promise.reject(error);
      }
    );
  }

  /**
   * @description  常用请求方法封装
   */
  // request<T>(config: CustomAxiosRequestConfig): Promise<T> {
  //   return new Promise((resolve, reject) => {
  //     this.service.request(config).then(
  //       res => {
  //         resolve(res.data);
  //       },
  //       err => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }

  post<T>(
    url: string,
    params?: object | string,
    _object = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new HttpRequest(config);
// const Request = new HttpRequest(config);

// export const test = () => {
//   // console.log('test');

//   Request.post('/geeker/login', {
//     username: 'admin',
//     password: md5('123456')
//   }).then(res => {
//     console.log(res);
//   });
// };

// export const test2 = () => {
//   console.log('test');

//   Request.get('/geeker/menu/list').then(res => {
//     console.log(res);
//   });
// };
