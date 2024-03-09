<script setup>
import { ref } from 'vue'
import { artEditChannleService, artAddGetChannleService } from '@/api/article'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const formRef = ref({})
const rules = {
  cate_name: [
    { require: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { require: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
const onSunmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannleService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddGetChannleService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露 基于open传来的参数
const open = (row) => {
  // console.log(row)
  // debugger
  dialogVisible.value = true
  formModel.value = { ...row } //添加就是重置了 ，编辑就是复制上去了
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑' : '添加'"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称">
        </el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名">
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSunmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
