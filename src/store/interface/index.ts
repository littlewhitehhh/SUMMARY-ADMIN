/* globalState */
export type AssemblySizeType = 'large' | 'default' | 'small';

export interface GlobalState {
  isCollapse: boolean;
  breadcrumbIcon: boolean;
  assemblySize: AssemblySizeType;
  language: 'zh' | 'en';
  layout: 'vertical' | 'classic' | 'transverse' | 'columns';
  isGrey: boolean;
  isDark: boolean;
  isWeak: boolean;
  asideInverted: boolean;
  breadCrumb: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
  maximize: boolean;
  primary: string;
}

/*UserState */

export interface UserState {
  token: string;
  userInfo: {
    name: string;
  };
}

// authState
export namespace Menu {
  export interface ItemMeta {
    icon: string;
    isAffix: boolean;
    isFull: boolean;
    isHide: boolean;
    isKeepAlive: boolean;
    isLink?: string;
    activeMenu?: string;
    title: string;
  }

  export interface AuthMenuListItem {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    children?: AuthMenuListItem[];
    meta: ItemMeta;
  }
}

export interface AuthState {
  authMenuList: Menu.AuthMenuListItem[];
}

//
