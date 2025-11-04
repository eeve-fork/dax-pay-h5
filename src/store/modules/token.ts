import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token-store',
  () => {
    const tokenValue = ref<string>('')
    const clientCode = ref<string>('')
    const setToken = (val: string) => {
      tokenValue.value = val
    }
    const getToken = () => {
      return tokenValue.value
    }

    const clearToken = () => {
      tokenValue.value = ''
    }
    const setClientCode = (val: string) => {
      clientCode.value = val
    }
    const getClientCode = () => {
      return clientCode.value
    }
    const isLogin = computed(() => !!tokenValue.value)

    return {
      setToken,
      getToken,
      clearToken,
      setClientCode,
      getClientCode,
      isLogin,
      tokenValue,
      clientCode,
    }
  },
)
