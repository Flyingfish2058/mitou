<template>
  <div class="hello">
    <van-nav-bar title="提现" left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-row class="box" type="flex" justify="space-around">
      <van-col class="box_a" span="23">
        真实姓名：
        <span>{{ xian.account }}</span>
      </van-col>
      <van-col class="box_a" span="23">
        银行卡号：
        <span>{{ xian.bank_address }}</span>
      </van-col>
      <van-col class="box_a" span="23">
        身份证号：
        <span>{{ xian.card_code }}</span>
      </van-col>
      <van-col class="box_b" span="23">
        {{ withdrawal }}
        <van-col class="box_c" span="24">
          ￥<input type="text" placeholder="最低提现金额" maxlength="20" v-model="money" @input="change()" />
        </van-col>
      </van-col>
      <van-col class="box_d" span="23">
        <van-row type="flex" justify="space-around">
          <van-col span="12">
            手续费：￥
            <span>{{ xians.service_charge }}</span>
          </van-col>
          <van-col span="12">
            可提现：￥
            <span></span>
          </van-col>
        </van-row>
      </van-col>
      <van-col class="box_d" span="23">
        <van-row type="flex" justify="space-around">
          <van-col span="15">
            预计税后到账：￥
            <span>{{shui}}</span>
          </van-col>
          <van-col span="9">
            税率扣点：￥
            <span>{{ xians.tax_rate }}</span>
          </van-col>
        </van-row>
      </van-col>
      <van-col class="box_e" span="23"><van-checkbox v-model="checked">同意《费用结算服务协议》的所有条款</van-checkbox></van-col>
      <van-row type="flex" justify="center"><van-image width="13rem" height="4rem" fit="contain" src="../static/Cash-withdrawal.png" @click="withdraw()" /></van-row>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 阅读协议
      checked: true,
      money: '',
      xian: [],
      xians: [],
      withdrawal: '提现金额'
    }
  },
  created () {
    // 点击体现按钮请求
    var _this = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/Getmoney/brokerage',
      params: {
        userid: 73
      }
    })
      .then(function (res) {
        _this.xian = res.data.user
        _this.xians = res.data.cost
      })
  },
  methods: {
    onClickLeft () {
      this.$router.push('/profit')
    },
    // 提现金额
    change () {
      this.shui = (this.money - this.xians.service_charge).toFixed(2) * (1 - this.xians.tax_rate).toFixed(2)
      // 如果提现金额的值为空，税后到账金额
      if (this.money == '') {
        this.shui = '0'
      }
    },
    withdraw () {
      var _this = this
      this.$axios({
        method: 'get',
        url: 'https://star.qhynice.top/api/Getmoney/Addmoney',
        params: {
          userid: 73,
          card: _this.xian.card_code,
          name: _this.xian.account
          // money: _this.shiji,
          // type: 1,
          // service: _this.xians.service_charge,
          // tmpmoney: _this.value,
          // card_number: _this.xian.card_code
        }
      })
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>
.van-icon {
  color: white;
  vertical-align: middle;
}
.van-nav-bar {
  position: relative;
  height: 2.875rem;
  line-height: 2.875rem;
  text-align: center;
  background-color: gray;
  user-select: none;
}
.van-nav-bar__text {
  display: inline-block;
  margin: 0 -1rem;
  margin-left: -1rem;
  padding: 0 16px;
  padding-left: 1rem;
  color: white;
  vertical-align: middle;
  font-size: 1.0625rem;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  font-size: 16px;
}
.box {
  flex-wrap: wrap;
  width: 90%;
  margin-left: 5%;
  margin-top: 2rem;
}
.box_a {
  height: 2.5rem;
  padding-left: 10%;
  padding-top: 0.6rem;
  margin-bottom: 2rem;
  font-size: 0.8125rem;
  border: 1px solid gray;
}
.box_a input {
  border: 0;
  width: 45vw;
}
.box_b {
  height: 6.5rem;
  padding-left: 5%;
  padding-top: 0.6rem;
  margin-bottom: 2rem;
  font-size: 0.8125rem;
  border: 1px solid gray;
}
.box_c {
  font-size: 1.5625rem;
  padding-top: 0.9375rem;
}
.box_c input {
  border: 0;
  position: fixed;
  width: 15rem;
}
.box_d,
.box_e {
  height: 2.5rem;
  padding-left: 2%;
  padding-top: 0.6rem;
  margin-bottom: 2rem;
  font-size: 0.8125rem;
  border: 1px solid gray;
}
</style>
