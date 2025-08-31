import { getWebsite } from '@/api/System.api'

/**
 * 初始化网站配置, 并且挂到全局
 */
export function initWebsiteConfig() {
  window.DAXPAY_WEBSITE_CONFIG = {}
  getWebsite().then((res) => {
    window.DAXPAY_WEBSITE_CONFIG = res.data
    // @ts-expect-error 动态更新 favicon
    document.getElementById('favicon').href = getFavicon()
    // 更新标题
    const projectName = getSystemTitle()
    document.title = `${projectName}`
  })
}

/**
 * 获取系统名称
 */
export function getSystemName() {
  // return getWebsiteConfig()?.systemName
  return getSystemTitle()
}
/**
 * 获取系统标题
 */
export function getSystemTitle() {
  return getWebsiteConfig()?.systemName || ''
}

/**
 * 获取系统logo
 */
export function getSystemLogo() {
  const wholeLogo = getWebsiteConfig()?.wholeLogo
  if (wholeLogo) {
    return `${import.meta.env.VITE_GLOB_API_URL_PREFIX}/file/download/${wholeLogo}`
  }
  else {
    return '/logo.png'
  }
}

/**
 * 获取favicon
 */
export function getFavicon() {
  const wholeLogo = getWebsiteConfig()?.wholeLogo
  if (wholeLogo) {
    return `${import.meta.env.VITE_GLOB_API_URL_PREFIX}/file/download/${wholeLogo}?t=${Date.now()}`
  }
  else {
    return '/favicon.ico'
  }
}

/**
 * 获取配置
 * @constructor
 */
export function getWebsiteConfig() {
  if (window.DAXPAY_WEBSITE_CONFIG) {
    return window.DAXPAY_WEBSITE_CONFIG as WebsiteConfig
  }
  return {}
}

/**
 * 站点显示内容配置
 * @author xxm
 * @since 2025/6/29
 */
export interface WebsiteConfig {
  /** 系统名称 */
  systemName?: string
  /** 公司全称 */
  companyName?: string
  /** 公司电话 */
  companyPhone?: string
  /** 公司邮箱 */
  companyEmail?: string
  /** 系统完整logo */
  wholeLogo?: string
  /** 系统简化Logo */
  simpleLogo?: string
  /** 工信部ICP备案信息 */
  icpInfo?: string
  /** 工信部ICP链接地址 */
  icpLink?: string
  /** 公网安备案信息 */
  mpsInfo?: string
  /** 公网安备案链接地址 */
  mpsLink?: string
  /** 中国支付清算协会备案信息 */
  pcacInfo?: string
  /** 中国支付清算协会备案链接地址 */
  pcacLink?: string
  /** 电信增值业务许可信息 */
  icpPlusInfo?: string
  /** 电信增值业务许可链接地址 */
  icpPlusLink?: string
  /** 版权信息 */
  copyright?: string
  /** 版权信息链接 */
  copyrightLink?: string
}
