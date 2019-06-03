<template>
    <div class="ui-radio-group">
      <label
        v-for="item in options" :key="item.key"
        :class="[ 'ui-radio', { 'is-checked': isActive(item.key) } ]"
        >
        <span  class="ui-radio__input">
          <input type="radio" v-model="checkbox" :value="item.key" class="ui-radio__original" >
          <span class="ui-radio__inner"></span>
        </span>
        <span class="ui-radio__label">{{item.value}}</span>
      </label>
    </div>
</template>
<script>
export default {
  props: {
    name: String,
    id: String,
    options: Array,
    value: {
      required: true
    }
  },
  data: () => ({ }),
  computed: {
    checkbox: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  },
  watch: { },
  methods: {
    isActive (key) {
      return this.value && key === this.value
    }
  },
  mounted () {
  }
}
</script>
