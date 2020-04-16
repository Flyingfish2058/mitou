<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="收益记录" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 额度 -->
    <div class="head">
      <van-row class="head_a" type="flex" justify="space-between">
        <van-col span="7">
          <p class="yuan">{{profit.tixian}}</p>
          <p class="bignum">{{cash.withdrawable}}</p>
        </van-col>
        <van-col span="7">
          <p class="yuan">{{profit.definite}}</p>
          <router-link to="/withdrawal">
            <div class="reflect">{{profit.cash}}</div>
          </router-link>
        </van-col>
      </van-row>
      <van-row class="head_b" type="flex" justify="space-around">
        <van-col span="7" v-for="people in person">
          <p class="yuan">{{people.yuan}}</p>
          <p class="num">{{people.num}}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 日报 -->
    <div class="make">
      <div class="yesday">
        <p>{{day.one}}</p>
        <router-link to="/dailydetails">
          <p class="report">{{day.two}}</p>
        </router-link>
      </div>
      <div class="daily">
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{day.three}}</p>
            <p>{{yesterday.activate}}</p>
          </van-col>
          <van-col span="6">
            <p>{{day.five}}</p>
            <p>{{yesterday.spread}}</p>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{day.seven}}</p>
            <p>{{yesterday.raise}}</p>
          </van-col>
          <van-col span="6">
            <p>{{day.nine}}</p>
            <p>{{yesterday.retail}}</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 月报 -->
    <div class="make">
      <div class="yesday">
        <p>{{month.one}}</p>
        <router-link to="/magazine">
          <p class="report">{{month.two}}</p>
        </router-link>
      </div>
      <div class="daily">
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{month.three}}</p>
            <p>{{month_money.activate}}</p>
          </van-col>
          <van-col span="6">
            <p>{{month.five}}</p>
            <p>{{month_money.spread}}</p>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{month.seven}}</p>
            <p>{{month_money.raise}}</p>
          </van-col>
          <van-col span="6">
            <p>{{month.nine}}</p>
            <p>{{month_money.retail}}</p>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profit: {
        tixian: '可提现（元）',
        // jine: '6.68',
        definite: '明细',
        cash: '去提现>>'
      },
      cash:[],
      person: [
        {
          yuan: '累计到账（元）'
        },
        {
          yuan: '已提现（元）'
        },
        {
          yuan: '未到账（元）',
        }
      ],
      yesterday:[],
      day:{
        one:'昨日日报',
        two:'日报',
        three:'激活奖励',
        five:'推广奖励',
        seven:'育成奖励',
        nine:'分润奖励'
      },
      month_money:[],
      month:{
        one:'本月月报',
        two:'历史月报',
        three:'激活奖励',
        five:'推广奖励',
        seven:'育成奖励',
        nine:'分润奖励'
      }
    }
  },
  created() {
    // 收益记录
    var _this = this
    this.$axios({
      methods:'get',
      url:'https://star.qhynice.top/api/personal/profit',
      params:{
        userid:73
      }
    })
    .then(res =>{
      // console.log(res)
      _this.cash = res.data.countmoney
      _this.person[0].num = res.data.countmoney.bonuses_money
      _this.person[1].num = res.data.countmoney.bonuses_money
      _this.person[2].num = res.data.countmoney.unliquidated
      // 昨日日报
      _this.yesterday = res.data.yesterday_money
      // 本月月报
      _this.month_money = res.data.month_money
    })
  },
  methods:{
    onClickLeft () {
      this.$router.push('/mine')
    },
    onClickRight(){
      this.$router.push('/')
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
.head_a,.head_b{
  text-align: center;
  background-color: #000000;
}
.head_b{
  margin-top: -0.9375rem;
}
.yuan{
  font-size:0.8125rem;
  color: rgba(166,166,166,1);
}
.bignum,.num{
  color: white;
}
.bignum{
font-size: 1.625rem;
font-weight: bold;
margin-top: -0.3125rem;
}
.reflect{
  height: 1.875rem;
  color: white;
  background-color:orange;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 3.125rem;
  border-top-left-radius: 3.125rem;
}
.make{
  width: 84%;
  padding-left: 6%;
}
.yesday{
  display: flex;
  justify-content: space-between;
}
.report{
  color: orange;
}
.daily{
  height: 10.25rem;
  box-shadow: 0px 4px 10px #969799;
  border-radius: 0.3125rem;
  padding-top: 0.9375rem;
}
.one{
  height: 4.375rem;
}
.one p{
  margin-bottom: -0.625rem;
}
</style>
