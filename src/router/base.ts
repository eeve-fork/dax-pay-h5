import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

const Layout = () => import('@/layout/index.vue')

// 404 on a page
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PageEnum.ERROR_PAGE_NAME,
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
}

/**
 * 主页面
 */
export const routeModuleList: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: {
      title: '主控台',
      icon: 'wap-home',
    },
    children: [
      {
        path: 'index',
        name: 'DashboardPage',
        meta: {
          keepAlive: false,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
]

/**
 * 业务模块路由
 */
export const BusinessRoute: RouteRecordRaw = {
  path: '/',
  name: '',
  redirect: PageEnum.BASE_HOME,
  component: Layout,
  children: [
    {
      path: '/result/success',
      name: 'SuccessResult',
      component: () => import('@/views/result/SuccessResult.vue'),
      meta: {
        title: '操作成功',
      },
    },
    {
      path: '/result/error',
      name: 'ErrorResult',
      component: () => import('@/views/result/ErrorResult.vue'),
      meta: {
        title: '错误页',
      },
    },
  ],
}
