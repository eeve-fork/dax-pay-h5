<template>
  <div>
    <van-field
      v-model="showText"
      label-align="top"
      readonly
      :right-icon="showText ? 'clear' : ''"
      :required="required"
      :name="name"
      :rules="rules"
      :placeholder="placeholder"
      :label="label"
      @click="open"
      @click-right-icon="onClear"
    />
    <van-popup
      v-model:show="show"
      position="bottom"
    >
      <!-- 区域 -->
      <van-cascader
        v-model="cascaderValue"
        :field-names="fieldNames"
        :title="title || placeholder"
        :options="cascaderOptions"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
// 级联窗口组件
import { ref } from 'vue'

const { label, placeholder, name, rules = [], required, optionsLevel = 3, options = [], title }
  = defineProps<{ label: string, placeholder?: string, name: string, rules?: any[], required?: boolean, optionsLevel?: number, options?: any, title?: string }>()
const fieldNames = ref({
  text: 'name',
  value: 'code',
  children: 'children',
})
const modelValue = defineModel<string[]>()

// 显示在 field 上的文本
const showText = ref<string>('')
// 显示
const show = ref<boolean>(false)
// options
const cascaderOptions = ref<any[]>([])
// 选中的值
const cascaderValue = ref<string>('')

/**
 * 监听 modelValue 改变
 */
watch(() => modelValue.value, () => initData())
watch(() => options, () => initData())
/**
 * 初始化处理各项属性
 */
function initData() {
  if (modelValue.value && options) {
    cascaderValue.value = modelValue.value[modelValue.value.length - 1] || ''
    showText.value = findOptionText(cascaderValue.value) || ''
  }
  if (options) {
    cascaderOptions.value = formatDate(options)
  }
}

/**
 * 格式化树装数据
 */
function formatDate(data) {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item) => {
    const { children, ...rest } = item
    if (children && children.length > 0 && item.level < optionsLevel) {
      rest.children = formatDate(children)
    }
    return rest
  })
}

/**
 * 打开选择弹窗
 */
function open() {
  show.value = true
}

/**
 * 选中函数
 */
function onFinish({ selectedOptions }) {
  show.value = false
  modelValue.value = selectedOptions.map(option => option.code)
}

function onClear(e) {
  // 阻止冒泡到 @click
  e.stopPropagation()
  modelValue.value = []
}

/**
 * 递归查找值在级联列表中对应的文本
 */
function findOptionText(value): string {
  if (!value) {
    return ''
  }

  const search = (items, path: any = []) => {
    for (const item of items) {
      const currentPath = [...path, item.name]
      if (item.code === value) {
        return currentPath.join('/')
      }
      if (item.children) {
        const result = search(item.children, currentPath)
        if (result) {
          return result
        }
      }
    }
    return null
  }
  return search(options) || ''
}
</script>

<style scoped lang="less">
</style>
