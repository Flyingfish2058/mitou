<template>
  <div class="hello">
    <van-nav-bar title="商品詳情" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="big">
      <p id="name">{{people}}</p>
      <p id="promo">{{promo}}</p>
      <!-- 时间戳转日期格式  {{ 时间戳 | dateFormat }} -->
      <!-- <p id="time">{{time | dateFormat}}</p> -->
      <!-- 时间戳转日期格式  {{ 函数 （时间戳） }} -->
      <p id="time">{{timestampToTime(time)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      people: '',
      promo: '',
      time: ''
    }
  },
  created () {
    // 授权书
    var _this = this
    this.$axios({
      url: 'https://star.qhynice.top/api/authorize/index',
      method: 'get',
      params: {
        userid: 73
      }
    })
      .then(res => {
        console.log(res)
        _this.promo = res.data.list.promo
        _this.people = res.data.list.account
        _this.time = parseInt(res.data.list.certification_time)
      })
  },
  methods: {
    onClickLeft () {
      this.$router.push('/mine')
    },
    onClickRight () {
      this.$router.push('/')
    },
    // 时间戳转换日期格式
    timestampToTime (time) {
      var date = new Date(time * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '年' + MM + '月' + d + '日'
    }
  }
}
</script>

<style scoped>
.big {
  width: 100%;
  height: 93vh;
  background-image: url(../../static/la.png);
  background-size: 100% 100%;
  background-position: 0% 0%;
}
#name{
  position: absolute;
  top: 40.55vh;
  left: 25%;
  font-size: 1.1875rem;
  font-weight: bold;
}
#promo{
  position: absolute;
  top: 65.5vh;
  left: 35%;
  font-size: 1.1875rem;
  font-weight: bold;
}
#time{
  position: absolute;
  top: 80vh;
  left: 53%;
  font-size: 1.125rem;
  color:#5E6B7C;
}
</style>
