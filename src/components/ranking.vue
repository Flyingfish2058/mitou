<template>
  <div class="ranking">
    <!-- 标题 -->
    <van-nav-bar title="排行榜" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="wrap">
      <div class="title">
        <h1>{{top}}</h1>
        <div>
          <p>{{nar}}</p>
          <small>{{tops}}</small>
        </div>
      </div>
    </div>
    <div class="list">
      <p>{{one}}</p>
      <p class="on">{{two}}</p>
      <p>{{three}}</p>
    </div>
    <div class="lists">
      <div class="list" v-for="(list,index) in list">
        <p v-html="list.one"></p>
        <p v-html="list.two"></p>
        <p>{{list.three}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.push('/')
    }
  },
  data () {
    return {
      top: 'TOP',
      nar: '20',
      tops: '全国激活机具TOP',
      one: '排名',
      two: '伙伴',
      three: '激活量',
      list: [{
        one: '<img src="../../static/jinpai.png" />',
        two: '刘勋红',
        three: '12'
      },
      {
        one: '<img src="../../static/yinpai.png" />',
        two: '王亚应',
        three: '14'
      },
      {
        one: '<img src="../../static/tongpai.png" />',
        two: '刘玉红',
        three: '11'
      },
      {
        one: '<div class="mark" style="height: 25px;width: 25px;background-color:#ababab;border-radius: 50%; font-size: 16px;color:white;margin-left: 15%;text-align: center;">4</div>',
        two: '&nbsp&nbsp王一一',
        three: '17'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '李依伊',
        three: '32'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '天意一',
        three: '33'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '路易一',
        three: '11'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '李依伊',
        three: '22'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '天意一',
        three: '11'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '路易一',
        three: '22'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '李依伊',
        three: '11'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '天意一',
        three: '33'
      },
      {
        one: '<img src="../../static/assets/img1086116c8ec44478.png" />',
        two: '路易一',
        three: '44'
      }
      ]
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
  .wrap {
    background-image: url(../../static/ranbackground.png);
    background-size: 100%;
    padding: 5% 3% 1% 3%;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .title h1 {
    color: #ffc300;
    text-shadow: 3px 3px 5px #464444;
    position: relative;
    left: 10%;
    font-size: 2.5rem;
  }
  .title div>p {
    color: #ffc300;
    font-size: 1.5625rem;
    margin-bottom: 10%;
  }
  .title div>small {
    color: white;
  }

  .list {
    display: flex;
    justify-content: space-between;
    padding: 4%;
    border-bottom: 1px solid gainsboro;
  }
  .on {
    position: relative;
    left: 0.9375rem;
  }
  .list p {
    margin: auto 0;
  }
  .lists {
    height: 37.5rem;
    overflow-y: auto;
  }
</style>
