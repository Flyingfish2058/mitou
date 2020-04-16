<template>
  <div class="hello">
    <!-- 大pos机 -->
    <van-nav-bar title="商城" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="pos">大POS</div>
    <!-- 商品陈列 -->
    <div class="wares">
      <van-row class="show" type="flex" justify="space-between" >
        <van-col class="single" span="12" v-for="people in person" @click="detail(people.id)">
          <div class="photo">
            <!-- 商品图片 -->
              <van-image
                width="8rem"
                height="13rem"
                fit="contain"
                :src="people.images"
              />
          </div>
          <!-- 商品版本、价格信息、购买按钮 -->
          <div class="price">
            <p>{{people.name}}</p>
            <p>{{people.price}}</p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      person: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    detail (id) {
      let where = this
      where.id = id
      this.$router.push({
        path: 'description',
        query: {
          ke: id
        }
      })
    }
  },
  created () {
    var _this = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/goods/index'
    })
      .then(function (res) {
        console.log(res)
        _this.person = res.data.data
      })
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.van-nav-bar {
  position: relative;
  height: 2.875rem;
  line-height: 2.875rem;
  text-align: center;
  background-color: #696969;
}
.van-icon {
  color: white;
  vertical-align: middle;
}
.van-nav-bar__text {
  display: inline-block;
  color: white;
  vertical-align: middle;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  font-size: 1rem;
}
.pos{
  margin-left: 5%;
  padding-top: 3%;

}
.wares{
  width: 90%;
  margin-left: 5%;
  margin-top: 0.3125rem;
  border-top: 2px solid #969799;
}
.show{
  flex-wrap:wrap;
}
.single{
  width: 48%;
  background-color:#9B9B9B;
  background-size: 100% 100%;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.photo{
  width: 90%;
  margin: 3% auto;
  background-image: url(../../static/Frame.png);
  background-size: 100% 100%;
  text-align: center;
}
.photoes{
font-size: 0.625rem;
width: 81%;
margin-left: 10%;
text-align: left;
padding-bottom: 10%;
}
.price{
  font-size: 0.8125rem;
  padding-left: 8%;
  padding-bottom: 5%;
  line-height: 1.6;
}
.price button{
  border: 0;
  background-color:wheat;
  position: absolute;
  margin-left: 20%;
  margin-top: -5%;
  width: 14%;
  border-radius: 0.3125rem;
  color: #323233;
}
</style>
