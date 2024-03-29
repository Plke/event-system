import request from '@/utils/request'
// 获取文章分类
export const artGetChannlesService = () => request.get('/my/cate/list')
// 添加文章分类
export const artAddGetChannleService = (data) =>
  request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannleService = (data) =>
  request.put('/my/cate/info', data)
// 文章删除
export const artDelChannleService = (id) =>
  request.delete('/my/cate/del', { params: { id } })
// 文章，获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })

// 文章：添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })

// 文章：编辑文章
export const artEditService = (data) => request.put('/my/article/info', data)
