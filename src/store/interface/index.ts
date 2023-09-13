/* globalState */
export type AssemblySizeType = 'large' | 'default' | 'small';

export interface GlobalState {
  isCollapse: boolean;
  breadcrumbIcon: boolean;
  assemblySize: AssemblySizeType;
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
