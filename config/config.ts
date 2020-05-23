// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { winPath } = utils;

const { REACT_APP_ENV, GA_KEY } = process.env;
export default defineConfig({
  hash: true,
  publicPath: '/public/dist/',
  antd: {},
  analytics: GA_KEY
    ? {
        ga: GA_KEY,
      }
    : false,
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: '登录',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: '注册结果',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: '注册',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user', 'guest'],
          routes: [
            {
              path: '/',
              name: '首页',
              icon: 'home',
              component: './article/list',
            },
            {
              path: '/resource',
              name: '资源',
              icon: 'gold',
              component: './resource',
              authority: ['admin', 'user'],
            },
            {
              path: '/task',
              name: '作业',
              icon: 'file',
              component: './task/list',
              authority: ['admin', 'user'],
            },
            {
              name: '作业详情',
              hideInMenu: true,
              path: '/task/detail/:id/:userId',
              component: './task/detail',
              authority: ['admin', 'user'],
            },
            {
              path: '/writing',
              name: '创作中心',
              icon: 'edit',
              authority: ['admin', 'user'],
              routes: [
                {
                  name: '写文章',
                  icon: 'edit',
                  path: '/writing/article',
                  component: './writing/article',
                },
              ],
            },
            {
              path: '/admin',
              name: '管理中心',
              icon: 'dashboard',
              authority: ['admin'],
              routes: [
                {
                  name: '作业管理',
                  icon: 'snippets',
                  path: '/admin/task',
                  component: './admin/task',
                },
                {
                  name: '作业概览',
                  hideInMenu: true,
                  path: '/admin/taskoverview/:id',
                  component: './admin/task/overview',
                },
                {
                  name: '项目管理',
                  icon: 'flag',
                  path: '/admin/project',
                  component: './admin/project',
                },
                {
                  name: '工作室管理',
                  icon: 'cluster',
                  path: '/admin/group',
                  component: './admin/group',
                },
              ],
            },
            {
              path: '/article',
              authority: ['admin', 'user'],
              routes: [
                {
                  name: '文章详情',
                  path: '/article/:id',
                  component: './article/',
                },
              ],
            },
            {
              path: '/account',
              name: '个人中心',
              icon: 'user',
              hideInMenu: true,
              authority: ['admin', 'user'],
              routes: [
                {
                  name: '个人中心',
                  path: '/account/center/:id',
                  component: './account/center',
                },
                {
                  name: '个人设置',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              path: '/dashboard',
              name: 'Dashboard',
              icon: 'dashboard',
              hideInMenu: true,
              routes: [
                {
                  name: '分析页',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: '监控页',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: '工作台',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
