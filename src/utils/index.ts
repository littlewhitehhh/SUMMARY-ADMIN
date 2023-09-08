import { Menu } from '@/store/interface/index';

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (这里是需剔除 isHide == true 的菜单)
 * 不同的项目 依据不同
 * @param {Array} menuList
 * @returns {Array}
 */
export const getShowMenuList = (menuList: Menu.AuthMenuListItem[]) => {
  const newMenuList: Menu.AuthMenuListItem[] = JSON.parse(JSON.stringify(menuList));

  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
};

/**
 * @description 使用递归扁平化菜单 方便添加动态路由
 * @param {Array} menuList
 * @return  {Array}
 */
export const getFlatMenuList = (menuList: Menu.AuthMenuListItem[]) => {
  const newMenuList: Menu.AuthMenuListItem[] = JSON.parse(JSON.stringify(menuList));
  // return newMenuList.flat(Infinity);
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
};
