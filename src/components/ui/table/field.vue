<template>
  <div></div>
</template>
<script>
export default {
  props: {
    label: String,
    prop: String,
    align: String,
    fixed: [Boolean, String]
  },
  data: () => ({
  }),
  inject: ['table'],
  watch: { },
  computed: {
    uid () {
      return this._uid
    },
    attrs () {
      let data = this.$vnode.data
      return {
        class: data.class,
        staticClass: data.staticClass,
        style: data.style,
        staticStyle: data.staticStyle,
        normalizedStyle: data.normalizedStyle
      }
    }
  },
  methods: {
    setCell (vm = this) {
      this.$set(this.table.fields, this.uid, {
        attrs: this.attrs,
        props: this.$props,
        head: this.table.getSlot('head', vm),
        cell: this.table.getSlot('cell', vm)
      })
     
    },
    dell (index) {
      this.$delete(this.table.fields, index)
    }
  },
  beforeCreate () {},
  created () {
    this.setCell(this)
  },
  beforeUpdate () {
    this.setCell(this)
  },
  beforeDestroy () {
    this.dell(this.uid)
  }
}
</script>
