<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="收货地址" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 收货地址编辑 -->
    <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"
    @add="onAdd"
    @edit="onEdit" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      chosenAddressId: '1',
      list: [],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  created () {
    // 获取所有地址
    var _this = this
    this.$axios({
      url: 'https://star.qhynice.top/api/address/getaddress',
      methods: 'get',
      params: {
        user_id: 73
      }
    })
      .then(res => {
        console.log(res)
        _this.list = res.data.res
        for (var i in res.data.res) {
          _this.list[i].tel = _this.list[i].phone
        }
      })
  },
  methods: {
    // 跳转新增地址页面
    onAdd () {
      this.$router.push('/newaddress')
    },
    // 编辑地址,向删除地址函数传送地址表id
    onEdit (content) {
      let id = content.id
      console.log(id)
      this.$router.push({
        path: 'newaddress',
        query: {
          dz_id: id
        }
      })
    },
    // 点击顶部返回按钮，返回上一级
    onClickLeft () {
      this.$router.push('/order')
    },
    onClickRight () {
      this.$router.push('/')
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
</style>
