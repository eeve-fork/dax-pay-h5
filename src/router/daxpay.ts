import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

/**
 * 支付模块路由
 */
export const DaxPayRoute: RouteRecordRaw = {
  path: '/daxpay',
  name: 'daxpay',
  component: Layout,
  children: [
    {
      path: '/auth/alipay/:appId/:channel/:queryCode/:aliAppId',
      name: 'AlipayAuth',
      component: () => import('@/views/daxpay/auth/alipay/AlipayAuth.vue'),
      meta: {
        title: '支付宝信息获取',
      },
    },
    {
      path: '/auth/wechat/:appId/:channel/:queryCode',
      name: 'WechatAuth',
      component: () => import('@/views/daxpay/auth/wechat/WechatAuth.vue'),
      meta: {
        title: '微信信息获取',
      },
    },
    {
      path: '/cashier/:code',
      name: 'CashierCode',
      component: () => import('@/views/daxpay/cashier/Cashier.vue'),
      meta: {
        title: '收银台',
      },
    },
    {
      path: '/aggregate/:code',
      name: 'CheckAggregate',
      component: () => import('@/views/daxpay/aggregate/Aggregate.vue'),
      meta: {
        title: '聚合收银台',
      },
    },
    {
      path: '/aggregate/alipay/:code',
      name: 'AliCheckout',
      component: () => import('@/views/daxpay/aggregate/alipay/AlipayAggregate.vue'),
      meta: {
        title: '支付宝收银台',
      },
    },
    {
      path: '/aggregate/wechat/:code',
      name: 'WechatCheckout',
      component: () => import('@/views/daxpay/aggregate/wechat/WechatAggregate.vue'),
      meta: {
        title: '微信收银台',
      },
    },
    {
      path: '/paySuccess',
      name: 'PaySuccess',
      component: () => import('@/views/daxpay/result/PaySuccess.vue'),
      meta: {
        title: '支付成功页面',
      },
    },
    {
      path: '/payFail',
      name: 'payFail',
      component: () => import('@/views/daxpay/result/PayFail.vue'),
      meta: {
        title: '支付失败页面',
      },
    },
    {
      path: '/PayExcessTime',
      name: 'PayExcessTime',
      component: () => import('@/views/daxpay/result/PayExcessTime.vue'),
      meta: {
        title: '支付超时页面',
      },
    },
  ],
}
