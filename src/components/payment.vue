<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="确认支付" left-text="取消" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 支付页面 -->
    <van-row class="zhifu" type="flex" justify="center">
      <van-col class="dingdan" span="24">
        <p>订单付款</p>
        <h1>￥{{zong}}</h1>
      </van-col>
    </van-row>
    <van-row class="make" type="flex" justify="space-between">
      <van-col span="12">收款方</van-col>
      <van-col span="12">盛鑫达有限公司</van-col>
    </van-row>
    <!-- 支付按钮 -->
    <van-button class="button" type="primary" size="large" @click="alipaly()">立即支付</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zong: ''
    }
  },
  created () {
    this.zong = this.$route.query.total_price
    console.log(a)
  },
  methods: {
    // 点击顶部返回按钮，返回上一级
    onClickLeft () {
      this.$router.push('/order')
    },
    onClickRight () {
      this.$router.push('/')
    },
    // 支付
    alipaly () {
      let goodsid = this.$route.query.goodsid
      let goodsname = this.$route.query.goodsname
      let username = this.$route.query.username
      let address = this.$route.query.address
      let phone = this.$route.query.phone
      let buy_number_count = this.$route.query.buy_number_count
      let total_price = this.$route.query.total_price
      let api_data = this.$qs.stringify({
        userid: 73,
        goodsid: goodsid,
        goodsname: goodsname,
        username: username,
        address: address,
        phone: phone,
        buy_number_count: buy_number_count,
        total_price: total_price
      })
      this.$axios.post('https://star.qhynice.top/api/wxpay/index', api_data)
        .then(res => {
          console.log(res)
          if (res.data.state == 200) {
            alert('支付成功！')
          }
        })
    }
  }
}
</script>

<style scoped>
.van-icon {
  color: black;
  vertical-align: middle;
}
.van-nav-bar__text {
  display: inline-block;
  color: black;
  vertical-align: middle;
}
.zhifu{
  text-align: center;
  border: 1px solid beige;
  border-radius: 0.3125rem;
  height: 8.125rem;
  background-color: ghostwhite;
}
.dingdan p{
  margin-bottom: -1.125rem;
  padding-top: 0.9375rem;
  font-size: 1.0625rem;
  font-weight: bold;
}
.make{
  font-weight: 700;
  text-align: center;
  height: 1.5rem;
  background-color: ghostwhite;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.button{
  width: 90%;
  height: 3.125rem;
  line-height: 3rem;
  margin-left: 5%;
  border-radius: 0.6875rem;
  margin-top: 2rem;
}
</style>
