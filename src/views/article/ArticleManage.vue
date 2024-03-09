<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService, artDelChannleService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessage } from 'element-plus'
// import { pa } from '@element-plus/es/locale'
const articleList = ref([])

const total = ref(0)

const articleEditRef = ref()
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
  // console.log(row)
}
const onDeleteArticle = async (row) => {
  // 删除文件
  await artDelChannleService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
const onAddArticle = () => {
  // console.log(111)
  articleEditRef.value.open({})
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil(total.value + 1) / params.value.pagesize
    params.value.pagenum = lastPage
  }
  getArticleList()
}

const loading = ref(false)
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: null,
  state: null
})
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)

  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
const onSizeChange = (size) => {
  // 只要每页条数变化了，原来的访问意义不大了
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: null,
    state: null
  }
  getArticleList()
}

getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- v-model => modelValue and @update:modelValue 的简写 -->
        <ChannelSelect
          style="width: 100px"
          placeholder="请选择"
          v-model="params.cate_id"
        ></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select
          style="width: 100px"
          placeholder="请选择"
          v-model="params.state"
        >
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>

      <!-- pub_data需要经过函数格式化，使用template -->
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }"> {{ formatTime(row.pub_date) }} </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <!-- 利用作用域插槽获取当前数据 -->
        <template #default="{ row }">
          <el-button
            @click="onEditArticle(row)"
            circle
            type="primary"
            :icon="Edit"
          ></el-button>
          <el-button
            @click="onDeleteArticle(row)"
            circle
            type="danger"
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <!-- layout 排布组件及顺序 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: center"
    />

    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
