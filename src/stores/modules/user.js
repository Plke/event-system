import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'all', //存储的key值，默认为store名，如本例：commonStore
          storage: localStorage, //存储的位置，默认为sessionStorage
          path: ['info'] //需要存储的state状态，默认为所有
        }
      ]
    }
  }
)
