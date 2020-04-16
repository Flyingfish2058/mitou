<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar left-text="商户详情" left-arrow="" @click-left="onClickLeft" />
    <!-- 用户信息 -->
    <van-row class="xinxi" type="flex" justify="space-around">
      <van-col class="shift" span="21">转移商户</van-col>
      <van-col span="4">
        <van-image class="img" width="6rem" height="3.5rem" fit="contain" src="../static/Head-portrait（5）.png" />
      </van-col>
      <van-col class="name" span="13">{{name}}</van-col>
      <van-col class="money" span="7">
        <p style="padding-top: 0.3125rem;">{{ phone }}</p>
      </van-col>
    </van-row>
    <!-- 交易额 -->
    <div class="ranks">
      <van-row type="flex" class="rank" justify="space-around">
        <van-col style="line-height: 0.5;" span="12">
          <p style="font-size: 1.25rem">{{ thismonth }}</p>
          <p class="yuan">商户本月交易额（元）</p>
        </van-col>
        <van-col class="right" span="12">
          <p style="font-size: 1.25rem;">{{ count }}</p>
          <p class="yuan">累计商户交易额（元）</p>
        </van-col>
      </van-row>
    </div>
    <!-- 图表 -->
    <div class="face">
      <van-row type="flex" class="edu" justify="space-around">
        <van-col span="12"><p>交易额（元）</p></van-col>
        <van-col span="12" class="btn">
          <van-col id="time" span="6" v-for="people in people" @click="cut(people.id)">{{people.name}}</van-col>
        </van-col>
      </van-row>
    </div>
    <!-- 折线图 -->
    <div id="main" style="height: 400rpx;background-color: white;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  data () {
    return {
      charts: '',
      opinionData: [],
      name: '',
      phone: '',
      thismonth: '',
      count: '',
      people: [
        {
          name: '7日',
          id: '1'
        },
        {
          name: '半年',
          id: '2'
        }
      ]
    }
  },
  created () {
    var _this = this
    var kee_val = this.$route.query.ke
    let api_data = this.$qs.stringify({
      id: kee_val
    })
    this.$axios.post('https://star.qhynice.top/api/mymerchant/getuserInfo', api_data)
    .then(res => {
      _this.name = res.data.userinfo.name
      _this.phone = res.data.userinfo.phone
      _this.thismonth = res.data.sn_money.thismonth
      _this.count = res.data.sn_money.count
      _this.opinionData = res.data.seven_days
      _this.drawLine('main')
    })
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.push('/ness')
    },
    // 图表按钮切换日期
    cut (id) {
      var that = this
      var kee_val = this.$route.query.ke
      let api_data = this.$qs.stringify({
        id: kee_val
      })
      this.$axios.post('https://star.qhynice.top/api/mymerchant/getuserInfo', api_data).then(res => {
        // 如果图表按钮的id=1，就显示7天数据；如果id=2，就显示半年的数据
        if (id == 1) {
          // that.people[0]
          that.opinionData = res.data.seven_days
        } else if (id == 2) {
          that.opinionData = res.data.year_days
        }
        that.drawLine('main')
      })
    },
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['近七日收益']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1号', '2号', '3号', '4号', '5号', '6号']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '近七日收益',
            type: 'line',
            stack: '总量',
            data: this.opinionData
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.hello {
  background-color: darkgray;
}
.van-icon {
  color: black;
  vertical-align: middle;
}
.van-nav-bar {
  position: relative;
  height: 2.875rem;
  line-height: 2.875rem;
  text-align: center;
  background-color: darkgray;
  user-select: none;
}
.van-nav-bar__text {
  display: inline-block;
  color: black;
  vertical-align: middle;
}
.xinxi {
  font-size: 0.9375rem;
  padding-top: 1%;
  padding-bottom: 2%;
  background-color: white;
  flex-wrap: wrap;
}
.shift {
  display: flex;
  justify-content: flex-end;
  color: orange;
}
.img {
  position: absolute;
  margin-left: -0.75rem;
  margin-top: 0.125rem;
}
.name {
  padding-top: 1.25rem;
  padding-left: 3%;
}
.ranks {
  margin-top: 8%;
  background-color: white;
  border-bottom: 2px solid gainsboro;
}
.rank {
  color: black;
  text-align: center;
}
.right {
  line-height: 0.5;
  border-left: 0.125rem solid gainsboro;
}
.yuan {
  font-size: 0.9375rem;
  color: darkgrey;
}
/* 图表 */
.face {
  width: 90%;
  padding-top: 5%;
  background-color: white;
  padding-left: 5%;
  padding-right: 5%;
}
.edu {
  color: black;
}
.btn {
  text-align: center;
  padding-top: 0.9375rem;
}
</style>
