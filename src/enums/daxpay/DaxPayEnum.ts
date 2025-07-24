/**
 * 支付通道
 */
export enum ChannelEnum {
  ALI = 'ali_pay',
  WECHAT = 'wechat_pay',
  UNION_PAY = 'union_pay',
}

/**
 * 支付方式
 */
export enum PayMethodEnum {
  WAP = 'wap',
  APP = 'app',
  WEB = 'web',
  QRCODE = 'qrcode',
  BARCODE = 'barcode',
  JSAPI = 'jsapi',
}

/**
 * 收银台类型
 */
export enum CashierTypeEnum {
  H5 = 'h5',
  PC = 'pc',
  MINI_APP = 'mini_app',
  AGGREGATE = 'aggregate',
}

/**
 * 收银台聚合支付类型
 */
export enum AggregateEnum {
  ALI = 'alipay',
  WECHAT = 'wechat_pay',
}

/**
 * 网关支付调用类型
 */
export enum GatewayCallTypeEnum {
  // 跳转链接
  link = 'link',
  // JSAPI
  jsapi = 'jsapi',
  // 表单方式
  from = 'from',
  // 二维码
  qr_code = 'qr_code',
}

/**
 * 码牌类型
 */
export enum CashierSceneEnum {
  // 微信支付
  WECHAT_PAY = 'wechat_pay',
  // 支付宝支付
  ALIPAY = 'alipay',
  // 云闪付支付
  UNION_PAY = 'union_pay',
}
