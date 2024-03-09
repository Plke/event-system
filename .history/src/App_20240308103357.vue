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
  <hr />
  <router-view></router-view>
  <hr />
  <hr />

  <div>我是app</div>
  <TestDemo></TestDemo>
  <el-button @click="$router.push('/home')">跳首页</el-button>
  <el-button @click="golist">跳列表页</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('sad sdawdwad')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>

  <hr />
  <p>{{ countStore.count }}</p>

  <el-button @click="countStore.add(5)">加法</el-button>
</template>

<style scoped></style>
