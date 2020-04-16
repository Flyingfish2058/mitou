<template>
  <div class="hello">
    <van-row type="flex" justify="space-around">
      <van-col span="7" v-for="num in nums">
        <van-image
          width="100"
          height="100"
          :src="'https://dawn.changxvan.top/Data/' + num.photo_d"
        />
        <p>{{num.name}}</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nums: [

      ]
    }
  },
  created () {
    var keyword_val = this.$route.query.keyword
    var keydata = this.$qs.stringify({
      keyword: keyword_val
    })
    this.$axios.post('https://dawn.changxvan.top/api/search/get_product', keydata)
      .then((response) => {
        this.nums = response.data.pro
        console.log(response.data)
      })
  }
}
</script>

<style></style>
