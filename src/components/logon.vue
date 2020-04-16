<template>
  <div class="hello">
    <van-nav-bar title="注册" />
    <van-row type="flex" justify="center">
      <van-col span="20">
        <!-- 表单 -->
        <div class="form">
          <van-cell-group>
            <van-field v-model="username" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名" @click-right-icon="$toast('question')" />
            <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" required />
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
          </van-cell-group>
        </div>
        <!-- 注册按钮 -->
        <van-button style="margin-bottom: 0.9375rem;" color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" size="large" @click="logon()">注册</van-button>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" size="large" @click="dele()">删除数据</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      phone: '',
      password: '',
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || []
    }
  },
  methods: {
    logon () {
      if (this.username && this.phone && this.password) {
        var obj = {
          username: this.username,
          phone: this.phone,
          password: this.password
        }
        this.userInfo.push(obj)
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        this.$router.push('sign')
        // 点击注册按钮后，进行输入框的值清空
        this.username = ''
        this.phone = ''
        this.password = ''
      }
      else if (this.username == null && this.phone == null && this.password == null) {
        alert('请填写注册信息！')
      } else {
        var array = JSON.parse(localStorage.getItem('userInfo'))
        for (var i in array) {
          if (this.username == null || this.username == "") {
            alert('该昵称已存在，注册失败！')
          } else if (this.phone == null || this.phone == "") {
            alert('此号码已经注册！请输入手机号')
          } else if (this.password == null || this.password == "") {
            alert('注册失败！')
          } else {
            this.$router.push('sign')
          }
          return false
        }
      }
    },
    dele () {
      localStorage.clear()
    }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 2rem;
}
</style>
