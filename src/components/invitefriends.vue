<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="确认订单" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="friend">
        <van-image
          width="14rem"
          height="12rem"
          fit="contain"
          :src="invite.slogan"
        />
        <div class="white">
          <van-image
            width="4rem"
            height="6rem"
            fit="contain"
            :src="invite.logo"
          />
          <p class="title">{{invite.brand}}</p>
          <p>{{invite.phone}}</p>
          <p class="line">——</p>
          <div class="code">
            <p>{{invite.stack}}</p>
            <p>{{invite.fate}}</p>
          </div>
          <van-image
            width="10rem"
            height="12rem"
            fit="contain"
            :src="invite.qr"
          />
          <p>{{invite.stress}}</p>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      invite:{
        slogan:'../static/Win-win.png',
        logo:'../static/Crowd-Winner-Icon.png',
        brand:'众赢客',
        phone:'手机号：15136759237',
        stack:'邀请码',
        fate:'10067',
        qr:'../static/erweima.png',
        stress:'扫码邀请或在注册时直接填写邀请码'
      }
    }
  },
  methods:{
    onClickLeft () {
      this.$router.push('/');
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
.friend{
  display: flex;
  height:43.125rem;
  background-image: url(../../static/background.jpg);
  background-size: 100% 100%;
  flex-direction:column;
  align-items:center;
}
.white{
  height: 31rem;
  width:80%;
  background-color: white;
  margin-top: -2.1875rem;
  border-radius: 0.3125rem;
  text-align: center;
}
.white p{
  margin-top: -0.3125rem;
}
.code{
  letter-spacing: 0.125rem;
  font-size: 1.1875rem;
  color:orange;
}
.code p{
  line-height: 0.9375rem;
}
.title{
  font-size: 1.4375rem;
}
.line{
  font-weight: bold;
}
</style>
