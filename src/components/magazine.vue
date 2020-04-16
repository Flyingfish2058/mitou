<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="收益记录" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-tabs type="card">
      <van-tab title="上个月">
        <!-- 月报 -->
        <div class="make">
          <div class="yesday">
            <p>{{ month.one }}</p>
          </div>
          <div class="daily">
            <!-- 单元格 -->
            <van-cell-group class="choice" @click="tan()"><van-cell title="选择月份" :value="timeValue" /></van-cell-group>
            <!-- 弹出层 -->
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <!-- 日期选择 -->
              <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :min-date="minDate"
                :formatter="formatter"
                @change="changeFn()"
                @confirm="confirmFn()"
                @cancel="cancelFn()"
              />
            </van-popup>
            <van-row type="flex" justify="space-around" class="one">
              <van-col span="6">
                <p>{{ month.three }}</p>
                <p>{{ reward.activate }}</p>
              </van-col>
              <van-col span="6">
                <p>{{ month.five }}</p>
                <p>{{ reward.generalize }}</p>
              </van-col>
            </van-row>
            <van-row type="flex" justify="space-around" class="one">
              <van-col span="6">
                <p>{{ month.seven }}</p>
                <p>{{ reward.breed }}</p>
              </van-col>
              <van-col span="6">
                <p>{{ month.nine }}</p>
                <p>{{ reward.profit }}</p>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-tab>
      <van-tab title="近三个月">内容 2</van-tab>
      <van-tab title="近四个月">内容 3</van-tab>

    </van-tabs>
    <!-- 折线图 -->
    <van-row id="main" type="flex" justify="space-between">

    </van-row>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      show: false,
      currentDate: new Date(),
      charts: '',
      opinionData: [],
      month: {
        one: '2017年7月月报',
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
      url:'https://star.qhynice.top/api/personal/report_m',
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
    onClickLeft() {
      this.$router.push('/profit');
    },
    onClickRight() {
      this.$router.push('/');
    },
    tan() {
      this.show = true;
    },
    showPopup() {
      this.show = true;
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    changeFn() {
      // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() {
      // 确定按钮
      this.timeValue = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn() {
      this.show = true;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '年' + month + '月';
    },
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
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
          data: ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11','12']
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
      });
    }
  },
  mounted() {
    this.timeFormat(new Date());
    //调用
      this.$nextTick(function() {
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
.make {
  width: 90%;
  padding-left: 5%;
  margin-top: 1.875rem;
}
.yesday {
  display: flex;
  justify-content: space-between;
}
.report {
  color: orange;
}
.daily {
  height: 10.25rem;
  box-shadow: 0px 8px 10px #969799;
  border-radius: 0.3125rem;
  padding-top: 0.9375rem;
}
.choice {
  margin-top: -0.9375rem;
}
.one {
  height: 4.375rem;
  margin-top: -0.625rem;
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
