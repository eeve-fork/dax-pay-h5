import { Toast } from 'vant'

export function useCopy() {
  const copy = async (text) => {
    if (!text) {
      return Toast.fail('无内容可复制')
    }

    try {
      await navigator.clipboard.writeText(String(text))
      Toast.success('已复制')
    }
    catch (err) {
      // 降级方案
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      Toast.success('已复制')
    }
  }

  return { copy }
}
