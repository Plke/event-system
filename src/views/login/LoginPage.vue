<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

import { useRegisterService, useLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

import { useRouter } from 'vue-router'
const isRegister = ref(false)

// 注册
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 整个表单的校验规则
const rules = {
  // 校验时机trigger: 'change' 在改变时起效  'blur'失焦时触发输完后校验

  username: [
    // 非空校验
    { require: true, message: '请输入用户名', trigger: 'blur' },
    // 长度校验
    {
      min: 5,
      max: 10,
      message: '用户名为5-10位字符',
      trigger: 'blur'
    }
  ],
  password: [
    { require: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验
    {
      pattern: /^\S{6,15}/,
      message: '密码为6-15位的非空字符字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { require: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}/,
      message: '密码为6-15位的非空字符字符',
      trigger: 'blur'
    },
    // 自定义校验
    // rule 校验规则相关信息
    // value 要校验的值
    // callback 成功失败都要回调
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const form = ref()
const register = async () => {
  // 注册前先校验
  await form.value.validate()
  await useRegisterService(formModel.value)

  ElMessage.success('注册成功')
  isRegister.value = true
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await useLoginService(formModel.value)

  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

// 切换时重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- el-row 表示一行 分为了24份
  el-col 表示列 
        :span='12' 表示一行中，占12份（50%）
        :offset="3" 左侧margin为3份  -->

  <!-- el-form 表单 -->
  <!-- el-form-item 为每一行 -->
  <!-- el-input 表单元素 -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- form
          :model ：收集表单数据对象
          :rules ：绑定整个rules规则对象
          表单元素 v-model 绑定form的子属性
          prop配置生效的是哪个规则（和rules中的规则对应）
      -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 图标 :prefix-icon="Lock"  -->
          <!-- 框内内容 placeholder="请输入密码" -->

          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
