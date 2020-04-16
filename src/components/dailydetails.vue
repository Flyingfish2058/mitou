<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="收益日报" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 日报 -->
    <div class="make">
      <div class="yesday">
        <p>{{ day.one }}</p>
      </div>
      <div class="daily">
        <vue-datepicker-local v-model="time" />
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{ day.three }}</p>
            <p>{{ reward.activate }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ day.five }}</p>
            <p>{{ reward.generalize }}</p>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" class="one">
          <van-col span="6">
            <p>{{ day.seven }}</p>
            <p>{{ reward.breed }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ day.nine }}</p>
            <p>{{ reward.profit }}</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 折线图 -->
    <van-row id="main" type="flex" justify="space-between">

    </van-row>
  </div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'
import echarts from 'echarts'
export default {
  components: {
    VueDatepickerLocal
  },
  name: '',
  data () {
    return {
      time: new Date(),
      charts: '',
      opinionData: [],
      day: {
        one: '2019年8月20日日报',
        three: '激活奖励',
        five: '推广奖励',
        seven: '育成奖励',
        nine: '分润奖励'
      },
      reward:[]
    }
  },
  created() {
    // 折线图
    var _this = this
    this.$axios({
      methods:'get',
      url:'https://star.qhynice.top/api/personal/report_d',
      params:{
        userid:73
      }
    })
    .then(res =>{
      console.log(res)
      _this.reward = res.data
      _this.opinionData = res.data.total
      _this.drawLine('main')
    })
  },
  methods: {
    onClickLeft () {
      this.$router.push('/profit')
    },
    onClickRight () {
      this.$router.push('/')
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
          left: '4%',
          right: '5%',
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
  },
  // 调用
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main')
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
.head_a,
.head_b {
  text-align: center;
  background-color: #000000;
}
.head_b {
  margin-top: -15px;
}
.yuan {
  font-size: 0.8125rem;
  color: rgba(166, 166, 166, 1);
}
.bignum,
.num {
  color: white;
}
.bignum {
  font-size: 1.625rem;
  font-weight: bold;
  margin-top: -0.3125rem;
}
.reflect {
  height: 30px;
  color: white;
  background-color: orange;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 3.125rem;
  border-top-left-radius: 3.125rem;
}
.make {
  width: 84%;
  padding-left: 8%;
}
.yesday {
  display: flex;
  justify-content: space-between;
}
.report {
  color: orange;
}
.daily {
  height: 12.25rem;
  box-shadow: 0px 8px 10px #969799;
  border-radius: 0.3125rem;
  padding-top: 0.9375rem;
}
.one {
  height: 4.375rem;
}
.one p {
  margin-bottom: -0.625rem;
}
#main {
  width: 90%;
  height: 20rem;
  padding-left: 5%;
  padding-top:2.5rem;
}
</style>
