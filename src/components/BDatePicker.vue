<template>
  <div>
    <!-- 结束日期 -->
    <van-field
      v-model="showText"
      label-align="top"
      readonly
      :right-icon="showText ? 'clear' : ''"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :label="label"
      @click="open"
      @click-right-icon="onClear"
    />
    <!-- 时间弹窗 -->
    <van-popup v-model:show="show" destroy-on-close position="bottom">
      <van-date-picker
        v-model="datePickerValue"
        :columns-type="['year', 'month', 'day']"
        :min-date="new Date(1900, 0, 1)"
        :max-date="new Date(2099, 0, 1)"
        @cancel="show = false"
        @confirm="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { label, placeholder, name, rules = [] }
  = defineProps<{ label: string, placeholder?: string, name: string, rules?: any[]}>()

const modelValue = defineModel<string>()
// 显示在 field 上的文本
const showText = ref<string>('')
// 显示
const show = ref<boolean>(false)
// 绑定的值(默认当前年月一号)
const datePickerValue = ref<any[]>([new Date().getFullYear(), 0, 1])

// 监听和转换
watch(() => modelValue.value, () => {
  if (modelValue.value) {
    datePickerValue.value = modelValue.value.split('-')
  }
  showText.value = modelValue.value as string
}, { immediate: true })

/**
 * 打开选择弹窗
 */
function open() {
  show.value = true
}

/**
 * 选中函数
 */
function onFinish() {
  show.value = false
  modelValue.value = datePickerValue.value.join('-')
}

/**
 * 清除内容
 */
function onClear(e) {
  // 阻止冒泡到 @click
  e.stopPropagation()
  modelValue.value = ''
}
</script>

<style scoped lang="less">

</style>
