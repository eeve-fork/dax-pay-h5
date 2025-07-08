import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

/**
 * 支付H5模块路由
 */
export const DaxPayH5Route: RouteRecordRaw = {
  path: '/h5',
  name: 'h5',
  component: Layout,
  children: [
    {
      path: '/auth/alipay/:appId/:channel/:queryCode/:aliAppId',
      name: 'AlipayAuth',
      component: () => import('@/views/daxpay/h5/auth/alipay/AlipayAuth.vue'),
      meta: {
        title: '支付宝信息获取',
      },
    },
    {
      path: '/auth/wechat/:appId/:channel/:queryCode',
      name: 'WechatAuth',
      component: () => import('@/views/daxpay/h5/auth/wechat/WechatAuth.vue'),
      meta: {
        title: '微信信息获取',
      },
    },
    {
      path: '/cashier/:orderNo',
      name: 'Cashier',
      component: () => import('@/views/daxpay/h5/cashier/Cashier.vue'),
      meta: {
        title: '收银台',
      },
    },
    {
      path: '/cashier/code/:code',
      name: 'CashierCode',
      component: () => import('@/views/daxpay/h5/code/CashierCode.vue'),
      meta: {
        title: '收银台',
      },
    },
    {
      path: '/alipay/cashier/code/:code',
      name: 'AlipayCashierCode',
      component: () => import('@/views/daxpay/h5/code/alipay/AlipayCashierCode.vue'),
      meta: {
        title: '支付宝收银台',
      },
    },
    {
      path: '/wechat/cashier/code/:code',
      name: 'WechatCashierCode',
      component: () => import('@/views/daxpay/h5/code/wechat/WechatCashierCode.vue'),
      meta: {
        title: '微信收银台',
      },
    },
    {
      path: '/aggregate/:orderNo',
      name: 'CheckAggregate',
      component: () => import('@/views/daxpay/h5/aggregate/Aggregate.vue'),
      meta: {
        title: '聚合收银台',
      },
    },
    {
      path: '/aggregate/alipay/:orderNo',
      name: 'AliCheckout',
      component: () => import('@/views/daxpay/h5/aggregate/alipay/AlipayAggregate.vue'),
      meta: {
        title: '支付宝收银台',
      },
    },
    {
      path: '/aggregate/wechat/:orderNo',
      name: 'WechatCheckout',
      component: () => import('@/views/daxpay/h5/aggregate/wechat/WechatAggregate.vue'),
      meta: {
        title: '微信收银台',
      },
    },
    {
      path: '/paySuccess/:orderNo',
      name: 'PaySuccess',
      component: () => import('@/views/daxpay/h5/result/PaySuccess.vue'),
      meta: {
        title: '支付成功页面',
      },
    },
    {
      path: '/payFail',
      name: 'payFail',
      component: () => import('@/views/daxpay/h5/result/PayFail.vue'),
      meta: {
        title: '支付失败页面',
      },
    },
    {
      path: '/onboarded/leshua',
      name: 'leshua',
      component: () => import('@/views/daxpay/h5/onboarded/leshua/index.vue'),
      meta: {
        title: '乐刷进件',
      },
    },
  ],
}
/**
 * pc页面
 */
export const DaxPayPcRoute: RouteRecordRaw = {
  path: '/pc',
  name: 'pc',
  children: [
    {
      path: '/pc/cashier/:orderNo',
      name: 'PcCashier',
      component: () => import('@/views/daxpay/pc/cashier/Cashier.vue'),
      meta: {
        title: '收银台',
      },
    },
    {
      path: '/pc/paySuccess/:orderNo',
      name: 'PcPaySuccess',
      component: () => import('@/views/daxpay/pc/result/PaySuccess.vue'),
      meta: {
        title: '支付成功页面',
      },
    },
    {
      path: '/pc/payFail',
      name: 'PcPayFail',
      component: () => import('@/views/daxpay/pc/result/PayFail.vue'),
      meta: {
        title: '支付失败页面',
      },
    },
  ],
}
