<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="我的" />
    <div class="vipback">
      <!-- 朱广峰 -->
      <van-row type="flex">
        <van-col span="6">
          <van-image class="flex_left" round width="4rem" height="4rem" :src="mine.portrait" />
        </van-col>
        <van-col span="6" class="flex_right">
          <p>
            {{ people.user.account }}
            <van-image class="flex_right_photo" width="7rem" height="1rem" fit="contain" :src="mine.partner" />
          </p>
          <van-image class="flex_right_photo" width="9rem" height="3rem" fit="contain" :src="mine.box" />
          <div class="invite">邀请ID：{{ people.user.promo }}</div>
          <button class="copy">复制</button>
        </van-col>
        <span class="mold" v-if="people.user.status == 0">会员</span>
        <span class="mold" v-if="people.user.status == 1">VIP</span>
        <span class="mold" v-if="people.user.status == 2">合伙人</span>
      </van-row>
      <!-- 黑色卡片区域 -->
      <van-row type="flex" justify="center"><van-image width="21rem" fit="contain" :src="mine.cardone" /></van-row>
      <!-- 金色卡片区域 -->
      <van-row type="flex" justify="center"><van-image class="exhibit" width="22.8rem" fit="contain" :src="mine.cardtwo" /></van-row>
      <!-- 累计收益 -->
      <router-link to="/profit">
        <van-row class="gold" type="flex" justify="center">
          <van-image width="1.3rem" fit="contain" :src="mine.question" />
          <span>{{ mine.grand }}</span>
        </van-row>
      </router-link>
      <!-- 收益金额 -->
      <van-row class="money" type="flex" justify="center">{{ people.user.bonuses_money }}</van-row>
      <!-- 日期、奖励、金额 -->
      <van-row id="category" type="flex" justify="space-between">
        <van-col class="samll" span="4" v-for="merits in merits">
          <p>{{ merits.day }}</p>
          <p>{{ merits.reward }}</p>
          <p>{{ merits.shu }}</p>
        </van-col>
      </van-row>
      <!-- 订单、物料商城、授权书、客服 -->
      <van-row class="base" type="flex" justify="center">
        <van-grid :border="false" :column-num="6">
          <van-grid-item class="logo" v-for="option in option" :to="option.src">
            <van-image width="4rem" height="4rem" :src="option.open" />
            <p>{{ option.title }}</p>
          </van-grid-item>
        </van-grid>
      </van-row>
      <!-- 设置 -->
      <van-row class="put" type="flex" justify="space-between" v-for="pute in pute">
        <van-col class="put_left" span="6">
          <van-image width="1.8rem" height="5rem" fit="contain" :src="pute.image" />
          <span>{{ pute.brief }}</span>
        </van-col>
        <van-col class="put_right" span="6"><van-image width="0.7rem" height="5rem" fit="contain" :src="pute.arrow" /></van-col>
      </van-row>
    </div>
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
      status: '',
      people: [],
      mine: {
        portrait: '../static/Head-portrait.png',
        partner: '../static/partner02.png',
        box: '../static/box.png',
        cardone: '../static/card01.png',
        cardtwo: '../static/card02.png',
        question: '../static/question.png',
        grand: '累计收益 ＞'
      },
      merits: [
        {
          day: '今日',
          reward: '激活奖励'
        },
        {
          day: '当月',
          reward: '推广奖励'
        },
        {
          day: '累计',
          reward: '育成奖励'
        },
        {
          day: '当月',
          reward: '分润奖'
        }
      ],
      option: [
        {
          open: '../static/order.png',
          title: '订单'
        },
        {
          open: '../static/mall01.png',
          title: '物料商城'
        },
        {
          open: '../static/attorney.png',
          title: '授权书',
          src: '/la'
        },
        {
          open: '../static/service.png',
          title: '客服'
        }
      ],
      pute: [
        {
          image: '../static/specification.png',
          brief: '推广规则',
          arrow: '../static/right.png'
        },
        {
          image: '../static/tutorial.png',
          brief: '新手教程',
          arrow: '../static/right.png'
        },
        {
          image: '../static/Teachers.png',
          brief: '创业导师',
          arrow: '../static/right.png'
        },
        {
          image: '../static/feedback.png',
          brief: '意见反馈',
          arrow: '../static/right.png'
        },
        {
          image: '../static/Set.png',
          brief: '设置',
          arrow: '../static/right.png'
        }
      ],
      active: 4,
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
    // 用户身份标识
    var _this = this
    this.$axios({
      method: 'get',
      url: 'https://star.qhynice.top/api/personal/index',
      params: {
        userid: 73,
        tel: 18937319151
      }
    }).then(function (res) {
      _this.people = res.data
      _this.merits[0].shu = res.data.today_activace
      _this.merits[1].shu = res.data.month_retail
      _this.merits[2].shu = res.data.money_format
      _this.merits[3].shu = res.data.month_spread
    })
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.mold {
  z-index: 1;
  width: 3.7rem;
  margin-left: -1.6875rem;
  font-size: 0.6875rem;
  margin-top: 0.4375rem;
  text-align: center;
}
.hello {
  height: 56.25rem;
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
.vipback {
  width: 100%;
  height: 10.9375rem;
  background-color: #696969;
}
.flex_left {
  margin-left: 20%;
}
.flex_right p {
  font-size: 0.875rem;
  color: white;
  margin-top: 0.25rem;
}
.flex_right_photo {
  margin-top: 0.1875rem;
  position: absolute;
}
.invite {
  font-size: 0.75rem;
  width: 119%;
  padding-left: 10%;
  padding-top: 1.125rem;
  color: white;
}
.copy {
  background-color: transparent;
  border: 0.0625rem solid wheat;
  border-radius: 0.3125rem;
  font-size: 0.75rem;
  color: wheat;
  position: relative;
  width: 34%;
  top: -25%;
  left: 129%;
}
.exhibit {
  margin-top: -26%;
}
.gold {
  margin-top: -36%;
  position: relative;
  color: #8d480a;
  font-size: 0.9375rem;
}
.money {
  position: relative;
  color: #8d480a;
  font-size: 1.4375rem;
  letter-spacing: 0.1875rem;
  padding-top: 0.625rem;
}
#category {
  width: 77%;
  position: relative;
  padding-left: 3rem;
  margin-top: 0.5rem;
}
.samll {
  width: 22%;
  height: 3.6875rem;
  text-align: center;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: #8d480a;
  border-left: 1px solid orange;
}
.samll:first-child {
  border: none;
}
.base {
  padding-top: 2.1875rem;
}

.logo p {
  text-align: center;
  font-size: 0.8125rem;
}
.put {
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid #a9a9a9;
}
.put_left {
  width: 30%;
  height: 5rem;
  padding-left: 10%;
}
.put_left span {
  margin-top: 1.625rem;
  position: absolute;
  font-size: 1rem;
  padding-left: 5%;
}
.put_right {
  width: 30%;
  height: 80px;
  padding-left: 15%;
}
.van-tabbar-item--active {
  color: black !important;
}
</style>
