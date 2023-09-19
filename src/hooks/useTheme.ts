import { storeToRefs } from 'pinia';
import { Theme } from './interface/idnex';
import { DEFAULT_PRIMARY } from '@/config';
import { useGlobalStore } from '@/store/modules/global';
import { getLightColor, getDarkColor } from '@/utils/color';
import { AsideThemeType, asideTheme } from '@/style/theme';
type layoutValue = 'vertical' | 'classic' | 'transverse' | 'columns';

/**
 * @description 全局主题hooks
 *
 */

export const useTheme = () => {
  // 获取global中的主题
  const globalStore = useGlobalStore();

  const { primary, isWeak, isGrey, isDark } = storeToRefs(globalStore);

  // 切换布局
  const setLayout = (val: layoutValue) => {
    globalStore.setGlobalState('layout', val);
  };

  // 颜色选择
  const changePrimary = val => {
    globalStore.setGlobalState('primary', val);
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (key: Theme.GreyOrWeakType, value) => {
    const body = document.body as HTMLElement;
    if (!value) return body.removeAttribute('style');
    const styles: Record<Theme.GreyOrWeakType, string> = {
      grey: 'filter:grayscale(1)',
      weak: 'filter:invert(80%)'
    };
    body.setAttribute('style', styles[key]);
    const propName = key === 'grey' ? 'isWeak' : 'isGrey';
    globalStore.setGlobalState(propName, false);
  };

  // 切换暗黑模式
  const changeDark = () => {
    const html = document.documentElement as HTMLElement;
    if (isDark.value) return html.setAttribute('class', 'dark');
    else html.setAttribute('class', '');
    // 修改主题颜色
    changeTheme(primary.value);
    // 修改侧边栏
    setAsideTheme();
  };

  const changeTheme = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
    }
    document.documentElement.style.setProperty('--el-color-primary', val);
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    globalStore.setGlobalState('primary', val);
  };

  const setAsideTheme = () => {
    let type: AsideThemeType = 'light';
    if (isDark.value) type = 'dark';
    const theme = asideTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  const initTheme = () => {
    changeDark();
    if (isGrey.value) changeGreyOrWeak('grey', true);
    if (isWeak.value) changeGreyOrWeak('weak', true);
  };
  return {
    setLayout,
    changePrimary,
    changeGreyOrWeak,
    changeDark,
    setAsideTheme,
    initTheme
  };
};
