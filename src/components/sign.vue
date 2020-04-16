<template>
  <div class="hello">
    <van-nav-bar title="登录" />
    <van-row type="flex" justify="center">
      <van-col span="20">
        <!-- 表单 -->
        <div class="form">
          <van-cell-group>
            <van-field v-model="username" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名" @click-right-icon="$toast('question')" />
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
          </van-cell-group>
        </div>
        <!-- 注册按钮 -->
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" size="large" @click="sign()">登录</van-button>
      </van-col>
    </van-row>
    <div id="result"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    sign () {
      var array = JSON.parse(localStorage.getItem('userInfo'))
      for (var i in array) {
        var b = array[i]
      }
      console.log(b)
      if (this.username != b.username) {
        alert('用户名有误，请重新输入!')
      } else if (this.password != b.password) {
        alert('密码错误，请重新输入!')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 2rem;
}
</style>
