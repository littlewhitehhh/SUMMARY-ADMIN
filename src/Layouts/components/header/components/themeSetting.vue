<script lang="ts" setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import { storeToRefs } from 'pinia';
import { DEFAULT_PRIMARY } from '@/config';
// import { getDarkColor, getLightColor } from '@/utils/color';
// import { asideTheme, AsideThemeType } from '@/style/theme/index.ts';
import { useTheme } from '@/hooks/useTheme';

const { setLayout, changeDark, changeGreyOrWeak, changePrimary, setAsideTheme } = useTheme();

// type layoutValue = 'vertical' | 'classic' | 'transverse' | 'columns';
const drawerVisible = ref(false);
// const layout = ref<layoutValue>('vertical');
const globalStore = useGlobalStore();
// const layout = computed(() => globalStore.layout);
const { layout, primary, isWeak, isGrey, isDark, asideInverted, breadCrumb, breadcrumbIcon, tabs, tabsIcon, footer, isCollapse } =
  storeToRefs(globalStore);
// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
];

// 打开抽屉对话框
const handleOpen = () => {
  drawerVisible.value = true;
};

// const resetClick = () => {
//   console.log('重置');
// };
// const confirmClick = () => {
//   console.log('确定');
// };

// const setLayout = (value: layoutValue) => {
//   // layout.value = value;
//   // globalStore.setLayout(value);
//   globalStore.setGlobalState('layout', value);
// };

// x颜色选择
// const changePrimary = val => {
// console.log(val);
// globalStore.setGlobalState('primary', val);
// };
// type GreyOrWeakType = 'grey' | 'weak';
// 灰色和弱色切换
// const changeGreyOrWeak = (key, value) => {
//   console.log(key, value);
//   const body = document.body as HTMLElement;
//   if (!value) return body.removeAttribute('style');
//   const styles: Record<GreyOrWeakType, string> = {
//     grey: 'filter:grayscale(1)',
//     weak: 'filter:invert(80%)'
//   };
//   body.setAttribute('style', styles[key]);
//   const propName = key === 'grey' ? 'isWeak' : 'isGrey';
//   globalStore.setGlobalState(propName as any, false);
//   //
// };

// 切换暗黑模式
// const changeDark = () => {
//   const html = document.documentElement as HTMLElement;
//   if (isDark.value) html.setAttribute('class', 'dark');
//   else html.setAttribute('class', '');
//   // 修改主题颜色
//   changeTheme(primary.value);
//   setAsideTheme();
// };

// const changeTheme = (val: string | null) => {
//   if (!val) {
//     val = DEFAULT_PRIMARY;
//   }
//   document.documentElement.style.setProperty('--el-color-primary', val);
//   document.documentElement.style.setProperty(
//     '--el-color-primary-dark-2',
//     isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
//   );

//   for (let i = 1; i <= 9; i++) {
//     const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
//     document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
//   }
//   globalStore.setGlobalState('primary', val);
// };

// 设置侧边栏样式 => light inverted dark
// export type AsideThemeType = 'light' | 'inverted' | 'dark';
// const setAsideTheme = () => {
//   let type: AsideThemeType = 'light';
//   //侧边栏反转色  目前只支持vertical和classic 布局下生效 || transverse 布局下菜单栏默认为 inverted 模式

//   if (isDark.value) type = 'dark';
//   const theme = asideTheme[type];
//   for (const [key, value] of Object.entries(theme)) {
//     document.documentElement.style.setProperty(key, value);
//   }
// };
</script>
<template>
  <div class="theme-setting">
    <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="handleOpen"></i>

    <el-drawer v-model="drawerVisible" title="布局设置" size="300px">
      <template #default>
        <!-- 布局切换 -->
        <el-divider>
          <el-icon><Notification /></el-icon><span>布局切换</span>
        </el-divider>
        <div class="layout-box mb30">
          <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
            <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
              <div class="layout-aside"></div>
              <div class="layout-container">
                <div class="layout-light"></div>
                <div class="layout-content"></div>
              </div>
              <el-icon v-if="layout == 'vertical'">
                <CircleCheckFilled />
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
            <div
              :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
              @click="setLayout('transverse')"
            >
              <div class="layout-aside"></div>
              <div class="layout-light"></div>

              <el-icon v-if="layout == 'transverse'">
                <CircleCheckFilled />
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
            <div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
              <div class="layout-aside"></div>

              <div class="layout-light"></div>
              <div class="layout-content"></div>

              <el-icon v-if="layout == 'columns'">
                <CircleCheckFilled />
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
            <div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
              <div class="layout-aside"></div>
              <div class="layout-container">
                <div class="layout-light"></div>
                <div class="layout-content"></div>
              </div>
              <el-icon v-if="layout == 'classic'">
                <CircleCheckFilled />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
        <!-- 主题颜色 -->
        <el-divider>
          <el-icon><ColdDrink /></el-icon><span>主题颜色</span>
        </el-divider>
        <div class="theme-item">
          <span>主题颜色</span> <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
        </div>
        <div class="theme-item">
          <span>灰色模式</span> <el-switch v-model="isGrey" size="large" @change="changeGreyOrWeak('grey', !!$event)" />
        </div>

        <div class="theme-item">
          <span>色弱模式</span>
          <el-switch v-model="isWeak" size="large" @change="changeGreyOrWeak('weak', !!$event)" />
        </div>
        <div class="theme-item"><span>暗黑模式</span> <el-switch v-model="isDark" size="large" @change="changeDark" /></div>
        <div class="theme-item mb30">
          <span>侧边栏反转色</span> <el-switch v-model="asideInverted" size="large" @change="setAsideTheme" />
        </div>
        <el-divider>
          <el-icon><Setting /> </el-icon><span>界面设置</span>
        </el-divider>
        <div class="theme-item">
          <span>折叠菜单</span>
          <el-switch v-model="isCollapse" size="large" />
        </div>
        <div class="theme-item">
          <span>面包屑</span>
          <el-switch v-model="breadCrumb" size="large" />
        </div>
        <div class="theme-item">
          <span>面包屑图标</span>
          <el-switch v-model="breadcrumbIcon" size="large" />
        </div>
        <div class="theme-item">
          <span>标签栏</span>
          <el-switch v-model="tabs" size="large" />
        </div>
        <div class="theme-item">
          <span>标签栏图标</span>
          <el-switch v-model="tabsIcon" size="large" />
        </div>
        <div class="theme-item">
          <span>页脚</span>
          <el-switch v-model="footer" size="large" />
        </div>
      </template>
      <!-- <template #footer>
        <div style="flex: auto">
          <el-button @click="resetClick">重置</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template> -->
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
.theme-setting {
  // .title {
  color: #000;
  // }
  .layout-box {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .layout-item {
      display: flex;
      position: relative;
      box-sizing: border-box;
      width: 98px;
      height: 68px;
      margin-bottom: 20px;
      cursor: pointer;
      border-radius: 5px;
      padding: 6px;
      box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
      transition: all 0.2s;
      .layout-aside {
        background-color: var(--el-color-primary);
        border-radius: 3px;
      }
      .layout-container {
        .layout-light {
          background-color: var(--el-color-primary-light-5);
          border-radius: 3px;
        }
        .layout-content {
          background-color: var(--el-color-primary-light-8);
          border: 1px dashed var(--el-color-primary);
          border-radius: 3px;
        }
      }
      &:hover {
        box-shadow: 0 0 5px 1px var(--el-border-color-darker);
      }
      .el-icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: var(--el-color-primary);
        transition: all 0.2s;
      }

      .is-active {
        box-shadow: 0 0 0 2px var(--el-color-primary) !important;
      }
    }
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    .layout-aside {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .layout-aside {
      height: 20%;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
      height: 67%;
    }
  }
  .layout-columns {
    display: flex;

    justify-content: space-between;
    .layout-aside {
      width: 14%;
    }

    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
      width: 17%;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
      width: 55%;
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .layout-aside {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }

  .theme-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 14px 0;
    .span {
      display: flex;
      justify-content: center;
      font-size: 14px;
    }
  }
}
.mb30 {
  margin-bottom: 30px;
}
</style>
