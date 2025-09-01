if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // 成功获取位置信息
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(`经度: ${longitude}, 纬度: ${latitude}`)
      // 可以在此使用获取到的经纬度进行其他操作
    },
    (error) => {
      // 处理错误信息
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error('用户拒绝了定位请求')
          break
        case error.POSITION_UNAVAILABLE:
          console.error('位置信息不可用')
          break
        case error.TIMEOUT:
          console.error('请求定位超时')
          break
        default:
          console.error('未知错误')
      }
    },
  )
}
else {
  console.error('该浏览器不支持定位功能')
}
