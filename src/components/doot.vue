<template>
  <div class="hello">
    <div>
      <h3>这是父组件</h3>
      <p style="text-align: center;">
        <span>{{ childValue }}</span>
      </p>
      <example-child v-bind:message="parentMsg" @getChildValue="getValue"></example-child>
    </div>
  </div>
</template>

<script>
import exampleChild from './doots.vue'
export default {
  name: 'doot.vue',
  components: {
    exampleChild
  },
  data () {
    return {
      parentMsg: 'hello',
      childValue: ''
    }
  },
  mounted () {},
  methods: {
    getValue: function (val) {
      this.childValue = val
      // this.people.unshift(this.childValue)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.hello {
  width: 100%;
  height: 100vh;
  background-image: url(../../static/324814.jpg);
  background-size: 100%;
}
.search {
  width: 100%;
  bottom: 0;
  position: fixed;
}
</style>
