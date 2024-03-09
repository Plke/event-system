<script setup>
import { artGetChannlesService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  cid: {
    type: [Number, String]
  },
  width: { type: String }
})
const emit = defineEmits(['update:cid'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannlesService()
  // console.log('channelList', res.data.data)
  channelList.value = res.data.data
}

getChannelList()
</script>
<template>
  <el-select
    style="width: 100px"
    placeholder="请选择"
    :model-value="cid"
    @update:cid="emit('update:cid', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
