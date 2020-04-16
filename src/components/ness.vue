<template>
  <div class="hello">
    <!-- 顶部导航 -->
    <van-nav-bar title="商户人员" left-text="返回" right-text="首页" left-arrow="" @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="header">
      <!-- 搜索框 -->
      <van-search class="search" placeholder="请输入搜索关键词" background="false" v-model="value" @search="search()" />
      <div class="ranks">
        <van-row type="flex" class="rank" justify="space-around">
          <van-col style="line-height: 1;" span="12">
            <p style="font-size: 1.0625rem">{{thismonth}}</p>
            <p style="font-size: 1.0625rem;">本月商户</p>
          </van-col>
          <van-col style="line-height: 1;" span="12">
            <p style="font-size: 1.0625rem;">{{count}}</p>
            <p style="font-size: 1.0625rem;">累计商户</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 下拉菜单 -->
    <van-dropdown-menu class="xiala">
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <div>
      <van-row class="xinxi" type="flex" justify="space-around" v-for="people in people" @click="details(people.id)">
        <van-col span="4">
          <van-image class="img" width="6rem" height="3.5rem" fit="contain" :src="people.img" />
        </van-col>
        <van-col class="name" span="14">{{ people.name }}</van-col>
        <van-col class="money" span="6">
          <p class="volume">￥{{ people.money }}</p>
          <p>交易额</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      // activeNames: ['1'],
      thismonth: '',
      count: '',
      value1: 1,
      option1: [
        { text: '本月累计', value: 1 },
        { text: '新款商品', value: 2 },
        { text: '活动商品', value: 3 }
      ],
      people: []
    }
  },
  created () {
    var _this = this
    this.$axios({
      url: 'https://star.qhynice.top/api/mymerchant/myinfo',
      method: 'get',
      params: {
        userid: 73,
        type: 1
      }
    })
      .then(res => {
        _this.thismonth = res.data.params.thismonth
        _this.count = res.data.params.count
        _this.people = res.data.data
        _this.people[0].img = '../static/Head-portrait（5）.png'
        _this.people[1].img = '../static/Head-portrait（5）.png'
        _this.people[2].img = '../static/Head-portrait（5）.png'
      })
  },
  methods: {
    onClickLeft () {
      this.$router.push('/merchant')
    },
    // 搜索
    search (value) {
      this.$axios({
        url: 'https://star.qhynice.top/api/mymerchant/myinfo',
        method: 'post',
        params: {
          userid: 73,
          type: value
        }
      })
        .then(res => {
          for (var i in res.data.data) {
            if (this.value == res.data.data[i].name) {
              this.people = []
              this.people.push(res.data.data[i])
              return false
            }
          }
        })
    },
    details (id) {
      let _this = this
      _this.id = id
      // console.log(id)
      this.$router.push({
        path: 'merdata',
        query: {
          ke: id
        }
      })
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
.header {
  padding-bottom: 5%;
  background-image: url(../../static/square01.jpg);
  background-size: 100% 100%;
}
.search {
  width: 50%;
  margin-left: 25%;
}
.van-search .van-cell {
  flex: 1;
  padding: 0rem 0.5rem 0rem 0;
  background-color: transparent;
}
.van-search__content {
  flex: 1;
  padding-left: 0.5rem;
  background-color: gray;
  border-radius: 0.8125rem;
}
.ranks {
  margin-top: 4%;
}
.rank {
  color: white;
  text-align: center;
}
.xinxi{
  font-size: 0.9375rem;
  padding-top: 2%;
  padding-bottom: 2%;
  border-top: 0.125rem solid gainsboro;
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
.money {
  line-height: 0.5;
  font-size: 0.8125rem;
}
.volume{
  font-size: 1.0625rem;
}
.name,.volume{
  color: darkorange;
}
</style>
