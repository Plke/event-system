<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const golist = () => {
  router.push('/list')
  console.log(router, route)
}

import { useUserStore, useCountStore } from './stores'

const userStore = useUserStore()
const countStore = useCountStore()
</script>

<template>
  <hr />

  <router-view></router-view>

  
</template>

<style scoped></style>
