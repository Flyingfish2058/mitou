<template>
  <div class="hello">
    <!-- 输入框 -->
    <input type="text" v-model="content" @change="changeEvent" />
    <!-- 显示层，后边加一个过滤器处理函数，把英文首字母变为大写 -->
    <h3>{{ viewContent | changeCapitalLetter }}</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewContent: '',
      content: ''
    }
  },
  methods: {
    changeEvent () {
      this.viewContent = this.content
    }
  },
  filters: {
    changeCapitalLetter (value) { // value是输入框的内容，也是要显示的内容
      if (value) {
        let str = value.toString()
        // 获取英文，以空格分组把字符串转为数组，遍历每一项，第一项转为大写字母
        let newArr = str.split(' ').map(ele => {
          return ele.charAt(0).toUpperCase() + ele.slice(1)
        })
        return newArr.join(' ') // 数组转字符串 以空格输出。。。
      }
    }
  }
}
</script>

<style></style>
