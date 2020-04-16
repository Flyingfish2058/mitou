<template>
  <div class="hello">
    <!-- 头部 -->
    <div id="back">
      <van-row class="big" type="flex" justify="space-between">
        <van-col span="6" class="sculpture">
          <van-image round width="4rem" height="4rem" src="../static/Head-portrait.png" />
        </van-col>
        <van-col span="6" class="information">
          <p>{{ full.partnership }}</p>
          <van-image width="4rem" height="2rem" fit="contain" :src="full.senior" />
          <span v-if="identity == 0">会员</span>
          <span v-else-if="identity == 1">VIP</span>
          <span v-else-if="identity == 2">合伙人</span>
        </van-col>
        <van-col span="10">
          <van-search class="search" placeholder="搜索关键词" v-model="value" background="false" @search="onSearch" />
        </van-col>
        <van-col span="2" class="ding">
          <img :src="ding.dan" />
          <p>{{ ding.wen }}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 头部结束 -->

    <!-- 轮播开始 -->
    <div id="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="people in people">
          <img :src="people.images_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播结束 -->

    <!-- 宫格开始 -->
    <div class="logoes">
      <van-grid :border="false" :column-num="4">
        <van-grid-item class="logo" v-for="logo in logo" :to="logo.src">
          <van-image :src="logo.imge" />
          <span class="spek">{{ logo.spek }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 宫格结束 -->

    <!-- 交易开始 -->
    <div class="volume">
      <div class="volume_a">
        <van-image class="volume_b" width="30" height="30" :src="volume.logo" />
        <p>{{ volume.headline }}</p>
      </div>
      <div class="quota">
        <p class="quota_a">{{ volume.turnover }}</p>
        <p class="quota_b">{{ volume.amount }}</p>
      </div>
      <van-row type="flex" justify="space-around">
        <van-col span="7" v-for="nums in nums">
          <p class="number">{{ nums.shu }}</p>
          <p>{{ nums.increase }}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 交易结束 -->
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
      value: '',
      checked: true,
      active: 'home',
      identity: '',
      full: {
        partnership: '朱广峰',
        senior: '../static/partner02.png'
      },
      people: [],
      ding: {
        dan: '../static/message.png',
        wen: '订单'
      },
      logo: [
        {
          imge: '../static/user.png',
          spek: '用户拓展'
        },
        {
          imge: '../static/mall.png',
          spek: '商城',
          src: '/shop'
        },
        {
          imge: '../static/terminal.png',
          spek: '终端'
        },
        {
          imge: '../static/merchants.png',
          spek: '我的商户',
          src: '/merchant'
        },
        {
          imge: '../static/Invite-friends.png',
          spek: '邀请好友',
          src: '/invitefriends'
        },
        {
          imge: '../static/list.png',
          spek: '排行榜',
          src: '/ranking'
        },
        {
          imge: '../static/integral01.png',
          spek: '积分兑换'
        },
        {
          imge: '../static/Home.png',
          spek: '更多'
        }
      ],
      volume: {
        headline: '本月交易量',
        logo: '../static/money.png',
        turnover: '商户交易额（元）',
        amount: ''
      },
      nums: [
        {
          shu: '',
          increase: '新增会员（人）'
        },
        {
          shu: '',
          increase: '新增VIP（人）'
        }
      ],
      active: 0,
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
  // 轮播图接口请求
  created () {
    var _this = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/banner/index',
      params: {
        userid: 73
      }
    }).then(function (res) {
      // console.log(res)
      _this.people = res.data.data
    })
    // 交易额
    var that = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/banner/monthdata',
      params: {
        userid: 73
      }
    }).then(res => {
      console.log(res)
      that.volume.amount = res.data.data.total_price
      that.nums[0].shu = res.data.data.total_count
      that.nums[1].shu = res.data.data.member
    })
  },
  // 关键字搜索
  methods: {
    onSearch () {
      this.$router.push({
        path: 'abc',
        query: {
          keyword: this.value
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#back {
  width: 100%;
  height: 12.5rem;
  background-image: url(../assets/background.png);
  background-size: 100%;
  color: gainsboro;
}
.sculpture {
  /* width: 3.375rem;
  height: 3.125rem;
  border-radius: 50%;
  border: 2px solid orange;
  background-image: url(../assets/head.jpg);
  background-size: cover; */
}
.ding {
  width: 10%;
  top: -0.125rem;
  position: relative;
}
.ding img {
  width: 55%;
  position: relative;
  height: 1.4375rem;
  top: 0.625rem;
}
.ding p {
  font-size: 0.625rem;
  top: 0.125rem;
  position: relative;
  color: #ffdeaa;
}
.big {
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 7%;
}
.information {
  margin-top: -1.25rem;
  margin-left: -5%;
}
.information p {
  position: relative;
  font-size: 0.875rem;
  top: 15%;
}
.information span {
  width: 3.125rem;
  position: absolute;
  margin-left: -3.25rem;
  margin-top: 0.5rem;
  font-size: 0.625rem;
}
.information img {
  width: 50%;
  position: relative;
  padding-left: 5%;
}
.search {
  width: 100%;
}
#banner {
  width: 90%;
  margin-top: -6.5625rem;
  margin-left: 5%;
}
#banner img {
  width: 100%;
}
.logoes {
  width: 80%;
  padding-left: 10%;
  padding-top: 20px;
}
.spek {
  font-size: 0.875rem;
}
.volume {
  border-radius: 0.4375rem;
  width: 90%;
  margin-left: 5%;
  box-shadow: 0px 0px 8px #969799;
  margin-top: 5%;
  margin-bottom: 4rem;
}
.volume_a {
  height: 3.125rem;
  border-bottom: 1px solid darkgrey;
}
.volume_b {
  padding-left: 7%;
  padding-top: 0.625rem;
}

.volume_a p {
  position: relative;
  padding-left: 19%;
  top: -100%;
  font-size: 1.25rem;
  color: #383838;
}
.quota {
  text-align: center;
}
.quota_a {
  color: #b3b3b3;
}
.quota_b {
  color: #f8b602;
  margin-top: -0.625rem;
  font-size: 1.8125rem;
  font-weight: bold;
}
.van-col {
  text-align: center;
}
.number {
  font-weight: bold;
  color: #ee0a24 !important;
}
.van-col p {
  color: #b3b3b3;
}
.van-tabbar-item--active {
  color: black;
}
</style>
