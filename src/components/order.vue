<template>
  <div class="hello">
    <!-- 顶部返回 -->
    <van-nav-bar title="确认订单" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 联系方式、地址 -->
    <van-row type="flex" justify="space-between">
      <van-col class="address" span="20">
        <p>{{people.name}} : <span>{{people.phone}}</span></p>
        <small>{{people.address}}</small>
      </van-col>
      <van-col span="4" class="right_img">
        <router-link to="/address"><van-icon name="arrow" /></router-link>
      </van-col>
    </van-row>
    <!-- 购买信息 -->
    <van-row class="wares" type="flex" justify="space-between">
      <van-card
        :num="num"
        :price="price"
        desc="描述信息"
        :title="name"
        :thumb="img"
      />
    </van-row>
    <!-- 运费 -->
    <van-row class="fare" type="flex" justify="space-between">
      <van-col span="18">
        运费
      </van-col>
      <van-col span="6">
        免运费
      </van-col>
    </van-row>
    <!-- 添加备注 -->
    <van-row class="fare" type="flex" justify="space-between">
      <van-col span="5">
        添加备注
      </van-col>
      <van-col span="19">
        <textarea class="textarea"></textarea>
      </van-col>
    </van-row>
    <!-- 提交订单 -->
    <van-row class="refer" type="flex" justify="space-between">
      <van-col class="total" span="17">合计： ￥{{taiff}}</van-col>
      <van-col span="7">
        <van-button class="submit" type="primary" size="large" @click="submit(id)">提交订单</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: '',
      name: '',
      taiff: '',
      img: '',
      price: '',
      id: '',
      people: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go('-1')
    },
    onClickRight () {
      this.$router.push('/')
    },
    submit (id) {
      this.$router.push({
        path: 'payment',
        query: {
          goodsid: this.id,
          goodsname: this.name,
          username: this.people.name,
          address: this.people.address,
          phone: this.people.phone,
          buy_number_count: this.num,
          total_price: this.taiff
        }
      })
    }
  },
  created () {
    // 显示默认地址
    var _this = this
    this.$axios({
      url: 'https://star.qhynice.top/api/address/getaddress',
      methods: 'get',
      params: {
        user_id: 73
      }
    })
      .then(res => {
        for (var i in res.data.res) {
          if (res.data.res[i].is_default == 1) {
            _this.people = res.data.res[i]
            return false
          }
        }
      })
    // 商品订单信息
    this.num = this.$route.query.num // 商品总数量
    this.taiff = this.$route.query.taiff // 商品总价格

    let that = this
    let kee_val = this.$route.query.ke
    console.log(kee_val)
    let api_data = this.$qs.stringify({
    	id: kee_val
    })
    this.$axios.post('https://star.qhynice.top/api/goods/getinfo', api_data)
      .then(res => {
        console.log(res)
        that.name = res.data.data.name
        that.img = res.data.data.images
        that.price = res.data.data.price
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
.address {
  padding-left: 5%;
}
.right_img {
  padding-top: 1.875rem;
}
.wares{
  margin-top: 3.125rem;
  padding-left: 5%;
}
.wares_a{
  padding-top: 25px;
}
.ask{
  padding-left: 5%;
}
.fare{
  padding-top: 1.5625rem;
  padding-left: 5%;
}
.van-card {
  width: 90vw;
}
.textarea{
  border: none;
}
.refer{
  margin-top: 13.6rem;
  align-items: flex-end;
}
.total{
  align-self: center;
  padding-left: 5%;
  color: #EDC277;
  font-weight: 700;
}
.submit{
  background-color: #FFA500;
  border: 0;
  color: white;
}
</style>
