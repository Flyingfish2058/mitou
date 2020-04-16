<template>
    <div>
        <p style="margin: 20px 0;text-align: center;">我是子组件，父组件穿传过来的值是{{message}}</p>
        <div class="search">
          <form action="/">
            <van-search
             v-model="value"
             show-action
             placeholder="请输入搜索关键词"
             @search="onSearch"
             @cancel="onCancel" />
          </form>
          <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" size="large" @click="send">提交</van-button>
        </div>
        <div>
          <p v-for="arr in arr"></p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'doots.vue',
  props: ['message'],
  data () {
    return {
      value: '',
      arr:[]
    }
  },
  mounted () {
  },
  methods: {
    send: function () {
      this.arr.unshift(this.value)
      this.$emit('getChildValue', this.arr)
      this.value = ''
    },
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      Toast('取消')
    }
  }
}
</script>

<style scoped>

</style>
