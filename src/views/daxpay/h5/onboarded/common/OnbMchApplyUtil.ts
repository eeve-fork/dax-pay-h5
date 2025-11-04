import { cloneDeep } from 'lodash-es'
import { getMainBody, getShopInfo } from '@/views/daxpay/h5/onboarded/common/OnbMchApply.api'
/**
 * 初始化商户信息
 */
export async function initMerchantProfile(form, mchNo) {
  // 并行调用三个接口获取数据
  const [mainBodyRes, shopInfoRes] = await Promise.all([getMainBody(mchNo), getShopInfo(mchNo)])

  // 映射主体信息到表单
  if (mainBodyRes.data) {
    const mainBody = mainBodyRes.data

    // 映射基础信息
    if (mainBody.base) {
      Object.assign(form.merchant, {
        merchantType: mainBody.base.merchantType,
        merchantName: mainBody.base.merchantName,
        merchantShortName: mainBody.base.merchantShortName,
      })
    }

    // 映射法人信息
    if (mainBody.legal) {
      Object.assign(form.legal, cloneDeep(mainBody.legal), {
        frontPicUrl: mainBody.legal.frontPic,
        backPicUrl: mainBody.legal.backPic,
        // 清空图片ID字段
        frontPic: '',
        backPic: '',
      })
    }
    // 映射营业执照信息
    if (mainBody.license) {
      Object.assign(form.license, cloneDeep(mainBody.license), {
        licensePicUrl: mainBody.license.licensePic,
        // 清空图片ID字段
        licensePic: '',
      })
    }
  }

  // 映射经营场所信息到表单
  if (shopInfoRes.data) {
    const shopInfo = shopInfoRes.data
    Object.assign(form.shop, cloneDeep(shopInfo), {
      doorPicUrl: shopInfo.doorPic,
      insidePicUrl: shopInfo.insidePic,
      cashierPicUrl: shopInfo.cashierPic,
      // 清空图片ID字段
      doorPic: '',
      insidePic: '',
      cashierPic: '',
    })
  }
}
