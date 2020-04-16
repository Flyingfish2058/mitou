<template>
  <div class="hello">
    <!-- 顶部返回 -->
    <van-nav-bar title="商品詳情" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 商品图片 -->
    <div id="banner">
      <van-image width="100%" height="20rem" :src="people.images" />
    </div>
    <!-- 商品信息 -->
    <div class="jian">
      <p class="price">{{ people.price }}</p>
      <p class="name">{{ people.name }}</p>
      <small>{{ wares.freight }}</small>
    </div>
    <!-- 推广 -->
    <div class="overflowTest">
      <div class="van-multi-ellipsis--l3" v-html="people.describe" ></div>
    </div>
    <!-- 立即申请按钮 -->
    <!-- <button  >立即申请</button> -->
    <van-button class="btn" type="primary" size="large" @click="showPopup()">立即申请</van-button>
    <!-- 弹出确认购买页 -->
    <van-action-sheet v-model="show">
      <!-- 商品信息 -->
      <van-row type="flex" style="padding-top: 0.9375rem;" justify="space-between">
        <van-col span="12">
          <van-image
            width="10rem"
            height="9rem"
            fit="contain"
            :src="people.images"
          />
        </van-col>
        <van-col span="12">
          <p class="price">￥{{ taiff }}</p>
          <p class="name">{{ people.name }}</p>
          <small>{{ wares.freight }}</small>
        </van-col>
      </van-row>
      <!-- 购买数量 -->
      <van-row class="shuliang" type="flex" justify="space-around">
        <van-col span="10">
          购买数量：
        </van-col>
        <van-col span="10" class="bujinqi">
          <van-stepper v-model="value" @change="change()" />
        </van-col>
      </van-row>
      <!-- 立即购买按钮 -->
      <van-row type="flex" justify="center">
        <van-col class="paly" span="20">
          <button class="buy" @click="onBuyClicked(people.id)">立即购买</button>
        </van-col>
      </van-row>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      value: 1,
      taiff: '300',
      people: [],
      wares: {
        freight: '快递费：免运费'
      },
      order: {
        src: '/order'
      }
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 返回上一级页面
    onClickLeft () {
      this.$router.push('/shop')
    },
    // 返回首页页面
    onClickRight () {
      this.$router.push('/')
    },
    // 商品总价
    change () {
      // 总价=数量*单价
      this.taiff = this.value * this.people.price
    },
    // 立即购买按钮
    onBuyClicked (id) {
      let where = this
      where.id = id
      console.log(id)
      this.$router.push({
        path: 'order',
        query: {
          ke:id,
          num: this.value,
          taiff: this.taiff
        }
      })
    }
  },
  created () {
    // 单个商品接口详情接收
    let _this = this
    let kee_val = this.$route.query.ke
    let api_data = this.$qs.stringify({
    	id: kee_val
    })
    this.$axios.post('https://star.qhynice.top/api/goods/getinfo', api_data)
      .then(res => {
        // console.log(res)
        _this.people = res.data.data
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
#banner img {
  width: 100%;
}
.jian {
  flex-wrap: wrap;
  line-height: 0.5;
  padding-left: 5%;
  padding-bottom: 1.25rem;
  padding-top: 1.25rem;
}
.price {
  color: orange;
  font-weight: bold;
  letter-spacing: 2px;
}
.jian small {
  color: #b3b3b3;
}
.overflowTest {
  padding-left: 0.9375rem;
  width: 92%;
  height: 17.4375rem;
  overflow: auto;
  line-height: 1.5;
}

.btn {
  border: 0;
  background-color: #ee0a24;
  bottom: 0;
  position: fixed;
}
.shuliang{
  padding-top: 0.9375rem;
}
.bujinqi{
  display: flex;
  justify-content: center;
}
.paly{
  padding-top: 0.9375rem;
  padding-bottom: 0.9375rem;
}
.buy{
  width: 100%;
  height: 2.5rem;
  border-radius: 3.125rem;
  color:white;
  background-color:orange;
  border: none;
}
</style>
