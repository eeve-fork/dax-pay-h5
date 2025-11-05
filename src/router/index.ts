import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { ErrorPageRoute, routeModuleList } from '@/router/base'
import { useRouteStoreWidthOut } from '@/store/modules/route'

// 菜单
import { DaxPayAgentMiniRoute, DaxPayH5Route, DaxPayMchMiniRoute, DaxPayOnboardedRoute, DaxPayPcRoute } from '@/router/daxpay'
import { getSystemTitle } from '@/settings/initWebsiteConfig'

// 普通路由
export const constantRouter: RouteRecordRaw[] = [
  DaxPayH5Route,
  DaxPayPcRoute,
  DaxPayOnboardedRoute,
  DaxPayMchMiniRoute,
  DaxPayAgentMiniRoute,
  ErrorPageRoute,
]

const routeStore = useRouteStoreWidthOut()

routeStore.setMenus(routeModuleList)
routeStore.setRouters(constantRouter.concat(routeModuleList))

const router = createRouter({
  // 重定向时hash模式有场景无法跳转，需要使用history模式
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRouter.concat(...routeModuleList),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 设置名称
router.afterEach((to) => {
  const projectName = computed(() => getSystemTitle())
  document.title = `${to.meta.title || '无标题'} ${projectName.value}`
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
