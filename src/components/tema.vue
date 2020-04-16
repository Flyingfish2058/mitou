<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="我的团队" />
    <!-- 半圆背景 -->
    <van-image width="100%" height="213px" :src="dada.img" />
    <!-- 交易额显示区背景 -->
    <van-image class="deal" :src="dada.imga" />
    <!-- 交易显示的信息 -->
    <div class="turnover">
      <p>{{ central.headline }}</p>
      <h3>
        {{ central.icon }}
        <span>{{ moneys.money }}</span>
      </h3>
    </div>
    <!-- 一级、二级标签页 -->
    <van-tabs @click="onClick">
      <!-- 一级 -->
      <van-tab title="一级">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
        <!-- 会员信息栏 -->
        <div class="frame">
          <van-row class="infobar" type="flex" justify="space-around" v-for="people in person">
            <!-- 信息栏左侧 -->
            <van-col span="6">
              <van-image class="portrait" round width="4rem" height="4rem" :src="people.avatar" />
              <div class="status">
                <p>{{ people.account }}</p>
                <p v-if="people.status == 0">
                  会员
                  <span>{{ people.num }}</span>
                </p>
                <p v-if="people.status == 1">
                  VIP
                  <span>{{ people.num }}</span>
                </p>
                <p v-if="people.status == 2">
                  合伙人
                  <span>{{ people.num }}</span>
                </p>
              </div>
            </van-col>
            <!-- 信息栏右侧 -->
            <van-col span="6">
              <div class="infobar_right">
                <p>交易量：{{ people.money }}</p>
                <p>邀请人：{{ people.parentname }}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <!-- 二级 -->
      <van-tab title="二级">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
        <!-- 二级人员列表 -->
        <div class="frame">
          <van-row class="infobar" type="flex" justify="space-around" v-for="member in member">
            <!-- 信息栏左侧 -->
            <van-col span="6">
              <van-image class="portrait" round width="4rem" height="4rem" :src="member.avatar" />
              <div class="status">
                <p>{{ member.account }}</p>
              </div>
            </van-col>
            <!-- 信息栏右侧 -->
            <van-col span="6">
              <div class="infobar_right">
                <p>交易量：{{ member.money }}</p>
                <p>推广人：{{ member.parentname }}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item replace :to="navs.url" v-for="(navs, index) in icon" @click="myicon(index)">
        <span>{{ navs.name }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? navs.active : navs.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dada: {
        img: '../static/background.png',
        imga: '../static/base.png'
      },
      central: {
        headline: '本月团队交易量',
        icon: '￥'
      },
      moneys: [],
      ji: [],
      memberid: [],
      member: [],
      status: '',
      value1: 0,
      value2: 'a',
      value3: 'A',
      option1: [
        { text: '本月累计', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '会员数', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '会员', value: 'A' },
        { text: '好评排序', value: 'B' },
        { text: '销量排序', value: 'C' }
      ],
      person: [],
      two: [],
      active: 1,
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
  created () {
    // 我的团队本月交易量
    var _this = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/team/index',
      params: {
        userid: 73
      }
    })
      .then(function (res) {
        console.log(res)
        _this.moneys = res.data
      })
    // 团队等级显示级别
    var that = this
    this.$axios({
      url: 'https://star.qhynice.top/api/team/teamone',
      method: 'get',
      params: {
        userid: 73,
        type: 1
      }
    })
      .then(res => {
        that.person = res.data.one
        // 请求二级人员所需id存放在memberid数组中
        that.memberid = res.data.memberid
      })
  },
  methods: {
    // 标签页点击切换，请求接口显示二级人员信息
    onClick () {
      for (var i in this.memberid) {
        var thes = this
        this.$axios({
          url: 'https://star.qhynice.top/api/team/teamone',
          method: 'get',
          params: {
            userid: this.memberid[i]
          }
        })
          .then(res => {
            if (res.data.state == 1) { // 判断state值，进行循环输出
              for (var l in res.data.one) {
                thes.member.push(res.data.one[l])
              }
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  position: relative;
  height: 2.875rem;
  line-height: 2.875rem;
  text-align: center;
  background-color: #696969;
  user-select: none;
}
.van-nav-bar__title {
  color: wheat;
}
.van-nav-bar__text {
  color: wheat;
}
.van-icon {
  color: wheat;
}
.deal {
  width: 90%;
  height: 11.25rem;
  margin-top: -35%;
  opacity: 0.9;
  margin-left: 5%;
  box-shadow: 0px 0px 26px #969799;
  border-radius: 1.0625rem;
}
.turnover {
  height: 11.25rem;
  width: 84%;
  margin-left: 8%;
  margin-top: -44%;
  position: absolute;
  color: brown;
}
.turnover p {
  margin-left: 4%;
  margin-top: 10%;
}
.turnover h3 {
  text-align: center;
  margin-top: 12%;
  font-size: 1.875rem;
}
.van-tabs {
  position: relative;
  margin-top: 6%;
}
.frame {
  height: 63vh;
  overflow: auto;
  margin-bottom: 3.125rem;
}
.infobar {
  height: 80px;
  border: 1px solid #b3b3b3;
  margin-top: 1.25rem;
}
.portrait {
  margin-left: -30%;
  margin-top: 8%;
}
.status {
  margin-left: 42%;
  width: 110%;
  margin-top: -70%;
  font-size: 0.8125rem;
}
.infobar_right {
  width: 135%;
  margin-top: -0.375rem;
}
.infobar_right p {
  font-size: 1rem;
}
.van-tabbar-item--active {
  color: black !important;
}
</style>
