/**
 * 获取浏览器UA类型
 */
export function getBrowserUA() {
  const ua = navigator.userAgent
  if (ua.includes('MicroMessenger')) {
    return 'wechat'
  }
  else if (ua.includes('Alipay')) {
    return 'alipay'
  }
  else {
    return 'browser'
  }
}
