<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="众星商学院" @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="navigation">
      <!-- 搜索框 -->
      <van-search placeholder="搜索" v-model="value" />
      <!-- 内容链接-->
      <van-row class="link" type="flex" justify="space-around">
        <van-col span="8" style="display: flex;justify-content: center;" v-for="people in person" @click="dianji(people.name)">
          <van-image
          width="6.5rem"
          height="3rem"
          fit="contain"
          :src="people.img" />
        </van-col>
      </van-row>
    </div>
    <!-- 商学院实时动态 -->
      <van-row class="new" type="flex" justify="space-around" v-for="news in news">
        <van-col class="tips" span="8">
          <van-image
          width="8rem"
          height="6rem"
          fit="contain"
          :src="'https://star.qhynice.top'+news.images" />
        </van-col>
        <van-col class="tips" span="14">
          <p class="one">{{news.title}}</p>
          <p style="color: #999;">{{news.depict}}</p>
          <!-- 时间戳日期格式转换 -->
          <p style="color: #999;font-size: 0.9375rem;">{{timestampToTime(news.add_time)}}</p>
        </van-col>
      </van-row>
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
      title: null,
      xinxi: [],
      person: [
        {
          img: '../static/Beginners.png',
          name: '29'
        },
        {
          img: '../static/VIP01.png',
          name: '30'
        },
        {
          img: '../static/partner01.png',
          name: '31'
        },
        {
          img: '../static/new-star.png',
          name: '32'
        },
        {
          img: '../static/higher.png',
          name: '33'
        },
        {
          img: '../static/Teamdemeanor.png',
          name: '34'
        }
      ],
      news: [],
      active: 3,
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
    dianji (name) {
      var _this = this
      this.$axios({
        url: 'https://star.qhynice.top/api/business/articlelist',
        method: 'get',
        params: {
          category_id: name
        }
      })
        .then(res => {
          for (var i in res.data.content){
            _this.news = res.data.content
          }
        })
    },
    // 时间戳转换日期格式
    timestampToTime (time) {
      // console.log(time)
      var date = new Date(time * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ''
    }
  },
  mounted () {
    this.dianji(29)
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
}
.van-icon {
  color: white;
  vertical-align: middle;
}
.van-nav-bar__text {
  display: inline-block;
  vertical-align: middle;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  font-size: 1rem;
}
.van-search__content {
  border-radius: 1.125rem;
}
.link {
  display: flex;
  flex-wrap: wrap;
  margin-left:2%;
  margin-right: 2%;
  margin-top: 0.3125rem;
}
.navigation {
  border-bottom: 0.3125rem solid #a9a9a9;
  padding-bottom: 0.9375rem;
}
.details {
  margin-top: -1%;
}
.new {
  border-bottom: 0.0625rem solid #b3b3b3;
  height: 7.5rem;
}
.tips {
  line-height: 1;
  margin-top: 3%;
}
.one{
  font-weight: bold;
}
.logo {
  margin-top: -6.25rem;
  position: absolute;
  margin-left: -0.125rem;
}
.means {
  width: 64%;
  margin-left: 14%;
}
.means h4 {
  font-size: 0.875rem;
  margin-top: 0.625rem;
}
.means p {
  margin-top: 0.5625rem;
  font-size: 0.75rem;
  margin-left: 0%;
  color: #696969;
}
.means p span {
  padding-left: 3%;
  color: #696969;
}
.specific {
  font-size: 0.75rem;
  margin-top: -0.8125rem;
  text-indent: 2em;
  line-height: 1.0625rem;
  color: #696969;
}
.van-tabbar-item--active {
  color: black !important;
}
</style>
