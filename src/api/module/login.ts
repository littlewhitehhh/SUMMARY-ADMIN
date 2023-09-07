import HttpRequest from '../index';
import { PORT1 } from '@/api/config/servicePort';

import { Login } from '../types/index';
import { Menu } from '@/store/interface';
/**
 * @name 登录模块
 */

// 用户登录api
export const LoginApi = params => {
  return HttpRequest.post<Login.ResLogin>(PORT1 + `/login`, params);
};

// 请求菜单列表api
export const getAuthMenuListApi = () => {
  return HttpRequest.get<Menu.AuthMenuListItem>(PORT1 + `/menu/list`, {});
};

export const getAuthButtonListApi = () => {
  return HttpRequest.get(PORT1 + `/auth/buttons`, {});
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
};
