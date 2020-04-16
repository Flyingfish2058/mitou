<template>
  <div class="hello">
    <!-- 顶部返回按钮 -->
    <van-nav-bar title="新增收货地址" left-text="返回" right-text="" left-arrow @click-left="onClickLeft"  />
    <!-- 地址编辑 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
    <!-- 地图 -->
    <div>美利坚合众国</div>
    <baidu-map class="map" center="北京">
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-panorama></bm-panorama>
    </baidu-map>
  </div>
</template>

<script>
import { AddressEdit } from 'vant'
import areaList from '../assets/area.js'
export default {
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    // 返回上一级页面
    onClickLeft () {
      this.$router.push('/address')
    },
    // 新增地址
    onSave (content) {
      // console.log(content)
      this.$router.push('/address')
      if (content.isDefault == true) {
        var i = 1
      } else {
        var i = 0
      }
      this.$axios({
        url: 'https://star.qhynice.top/api/address/index',
        methods: 'post',
        params: {
          user_id: 73,
          name: content.name,
          phone: content.tel,
          address: content.addressDetail,
          is_default: i
        }
      })
        .then(res => {
          // console.log(res)
          this.$router.go(0)
        })
    },
    // 删除地址
    onDelete () {
      let key_dele = this.$route.query.dz_id
      console.log(key_dele)
      this.$axios({
        url: 'https://star.qhynice.top/api/address/del_adds',
        method: 'post',
        params: {
          user_id: 73,
          id: key_dele
        }
      })
        .then(res => {
          console.log(res)
          this.$router.push('address')
        })
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 25rem;
  }
</style>
