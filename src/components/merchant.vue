<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="我的商户" left-text="首页" left-arrow="" @click-left="onClickLeft" />
    <!-- 我的商户导航 -->
    <van-row type="flex" justify="space-around" style="font-size: 0.9375rem;" @click="business()">
      <van-col span="6">
        <van-image class="img" width="1rem" height="1rem" fit="contain" src="../static/line.png" />
        我的商户
      </van-col>
      <van-col span="6"></van-col>
      <van-col span="6" class="details">{{count}}人 ></van-col>
    </van-row>
    <!-- 商户名次排行 -->
    <div class="ranks">
      <van-row type="flex" class="rank" justify="space-around" v-for="people in people">
        <van-col span="7">
          <van-image class="img" width="6rem" height="2rem" fit="contain" :src="people.img" />
        </van-col>
        <van-col class="name" span="10">{{ people.name }}</van-col>
        <van-col class="money" span="7">
          <p class="volume">￥{{ people.money }}</p>
          <p>本月交易用户</p>
        </van-col>
      </van-row>
    </div>
    <!-- 隔离带 -->
    <div class="divide"></div>
    <!-- 个人业绩 -->
    <van-row type="flex" justify="space-between" style="margin-top: 8%;margin-bottom: 9%;">
      <van-col class="kpi" span="10">
        <van-image class="img" width="1rem" height="1rem" fit="contain" src="../static/line.png" />
        个人业绩（我的业绩）
      </van-col>
    </van-row>
    <!-- 用户交易额 -->
    <div class="turnover">
      <van-row class="turnover_a" type="flex" justify="center">
        <van-col span="24" style="font-size: 0.75rem;">本月商户交易额（元）</van-col>
        <van-col span="24" style="font-size: 1.5625rem;">￥{{ thismonth }}</van-col>
      </van-row>
      <van-row class="turnover_b" type="flex" justify="center">
        <van-col class="grand" span="24">
          <van-col span="24" style="font-size: 0.75rem;">累计商户交易额（元）</van-col>
          <van-col span="24" style="font-size: 1.5625rem;">￥{{ conuntmoney }}</van-col>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      people: [],
      thismonth: '',
      conuntmoney: '',
      count: ''
    }
  },
  methods: {
    // 返回首页
    onClickLeft () {
      this.$router.push('/')
    },
    business () {
      this.$router.push('/ness')
    }
  },
  created () {
    var _this = this
    this.$axios({
      url: 'https://star.qhynice.top/api/mymerchant/index',
      method: 'get',
      params: {
        userid: 73
      }
    })
      .then(res => {
        console.log(res)
        _this.people = res.data.desc
        _this.people[0].img = '../static/Icon(1).png'
        _this.people[1].img = '../static/lcon(2).png'
        _this.people[2].img = '../static/lcon(3).png'
        _this.thismonth = res.data.thismonth
        _this.conuntmoney = res.data.conuntmoney
        _this.count = res.data.count
      })
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
.details {
  display: flex;
  justify-content: flex-end;
}
.ranks {
  margin-top: 5%;
}
.rank {
  font-size: 0.9375rem;
  padding-top: 0.625rem;
  border-bottom: 1px solid gainsboro;
}
.img {
  position: absolute;
  margin-left: -0.75rem;
  margin-top: 0.125rem;
}
.name {
  padding-top: 0.625rem;
}
.money {
  line-height: 0;
  font-size: 0.8125rem;
}
.name,
.volume {
  color: #fedda9;
}
.divide {
  height: 2.25rem;
  background-color: #e9e9e9;
  margin-top: 5%;
}
.kpi {
  font-size: 0.9375rem;
  margin-left: 5%;
}
.turnover {
  border-top: 0.125rem solid #e9e9e9;
}
.turnover_a,
.turnover_b {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  line-height: 2;
  margin-top: 5%;
}
.turnover_b {
  height: 25vh;
  margin-top: 8%;
  background-image: url(../../static/square.png);
  background-size: 100% 100%;
}
.grand {
  height: 10vh;
  align-self: center;
  color: white;
}
</style>
