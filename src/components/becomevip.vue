<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="成为VIP" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- vip卡片背景 -->
    <div class="vipback"></div>
    <!-- vip卡 -->
    <van-image class="card" :src="become.vip" />
    <!-- vip卡内容 -->
    <van-row type="flex" class="information">
      <van-col class="flex_left" span="6">
        <van-image class="phono" width="60%" :src="become.phono" />
      </van-col>
      <van-col class="flex_right" span="6">
        <span>{{become.zgf}}</span><br />
        <van-image width="100%" :src="become.rank" />
        <p>{{become.ip}}</p>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="rank">
      <van-col span="4" v-for="people in person">
        <van-image class="phono" width="60%" :src="people.mark" />
        <p>{{people.title}}</p>
      </van-col>
    </van-row>
    <!-- 尊享超级权益 -->
    <div class="content">
      <van-row class="equity" type="flex" justify="center">
        <van-col span="8">{{content.tree}}</van-col>
      </van-row>
      <van-row type="flex" justify="center" v-for="plain in plain">
        <van-col class="explain" span="18">
          <p>{{plain.strate}}</p>
          <div>{{plain.charac}}</div>
        </van-col>
      </van-row>
      <button class="button">
        <!-- <img :src="prove.anniu" /> -->
      </button>
    </div>
    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item replace :to="navs.url" v-for="(navs,index) in icon" @click='myicon(index)'>
        <span>{{navs.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? navs.active : navs.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      become: {
        vip: '../static/card.png',
        phono: '../static/Head.png',
        zgf: '朱广峰',
        rank: '../static/partnership.png',
        ip: '高级合伙人',
        back: '../static/background1.png'
      },
      person: [
        {
          mark: '../static/vip.png',
          title: 'VIP'
        },
        {
          mark: '../static/team.png',
          title: '建队'
        },
        {
          mark: '../static/promote.png',
          title: '推广'
        },
        {
          mark: '../static/integral.png',
          title: '积分'
        }
      ],
      content: {
        tree: '尊享超级权益'
      },
      plain:[
        {
          strate:'如何成为会员',
          charac:'宝马(BMW)是享誉世界的豪华汽车品牌，宝马的车系有i、X、Z、纯数字4个车型，1、2、3、4、5、6、7、8等几个系列，还有在各系基础上进行改进的M系（宝马官方的高性能改装部门），宝马公司创建于1916年'
        },
        {
          strate:'如何成为会员',
          charac:'宝马(BMW)是享誉世界的豪华汽车品牌，宝马的车系有i、X、Z、纯数字4个车型，1、2、3、4、5、6、7、8等几个系列，还有在各系基础上进行改进的M系（宝马官方的高性能改装部门），宝马公司创建于1916年'
        },
        {
          strate:'如何成为会员',
          charac:'宝马(BMW)是享誉世界的豪华汽车品牌，宝马的车系有i、X、Z、纯数字4个车型，1、2、3、4、5、6、7、8等几个系列，还有在各系基础上进行改进的M系（宝马官方的高性能改装部门），宝马公司创建于1916年'
        }
      ],
      prove:{
        anniu:'../static/button.png'
      },
      active: 2,
      icon: [
        {
        url: '/',
        name: '首页',
        normal: '../static/home_0.png',
        active: '../static/home_1.png'
      },
      {
        url: '/tema',
        name: '我的团队',
        normal: '../static/team_.png',
        active: '../static/team_1.png'
      },
      {
        url: '/becomevip',
        name: '成为VIP',
        normal: '../static/vip_.png',
        active: '../static/vip_1.png'
      },
      {
        url: '/college',
        name: '众赢学院',
        normal: '../static/college.png',
        active: '../static/college_1.png'
      },
      {
        url: '/mine',
        name: '我的',
        normal: '../static/mine.png',
        active: '../static/mine_1.png'
      }
      ]
    }
  },
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
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
    background-color:#696969;
}
.van-icon {
    color:wheat;
    vertical-align: middle;
}
.van-nav-bar__text {
    display: inline-block;
    color:wheat;
    vertical-align: middle;
}
.van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: wheat;
    font-weight: 500;
    font-size: 1rem;
}
.vipback{
  width: 100%;
  height: 13.4375rem;
  background-color:#696969;
}
.card{
   width: 92%;
   height: 100%;
   margin-left: 4%;
   margin-top: -12.5rem;
}
.information{
  margin-top: -49%;
  position: relative;
}
.phono{
margin-left: 9%;
}
.flex_left{
  margin-left: 7%;
}
.flex_right{
  margin-left: -6%;
  line-height: 2;
}
.flex_right span{
  font-size: 15px;
}
.flex_right p{
  font-size: 0.875rem;
  color:wheat;
  margin-top: -2.125rem;
  position: relative;
  margin-left: 26%;
}
.rank p{
  text-align: center;
  position: relative;
  margin-left: -15%;
  margin-top: -3%;
  font-size: 0.9375rem;
}
.content{
  width: 100%;
  height: 115vh;
  background-image: url(../../static/background1.png);
  background-size: 100% 100%;
  position: relative;
  margin-top: -11%;
}
.equity{
  color: #ccd785;
  padding-top: 5.3125rem;
  text-align: center;
}
.explain{
  border: 1px solid wheat;
  margin-top: 1.625rem;
  border-radius: 10px;
  color: wheat;
}
.explain p{
  padding-left: 5%;
}
.explain div{
  width: 90%;
  padding-left: 5%;
  padding-bottom: 5%;
  font-size: 0.875rem;
}
.button{
  background-image: url(../../static/button.png);
  width: 50%;
  height: 2.8125rem;
  background-size: 100% 100%;
  margin-left: 25%;
  margin-top: 1.875rem;
}
.van-tabbar-item--active {
    color:black !important;
}
</style>
