<template>
    <div class="ui-form-item">
        <label :for="labelFor" class="ui-form-item__label" v-if="label || $slots.label">
            <slot name="label">{{label}}</slot>
        </label>
        <slot/>
    </div>
</template>
<script>
export default {
  props: {
    label: String,
    prop: String,
    for: String
  },
  data: () => ({ }),
  computed: {
    labelFor () {
      return this.for || this.prop
    }
  },
  watch: { },
  methods: { },
  created () { },
  mounted () { },
  beforeDestroy () {}
}
</script>
<style lang="scss">
.ui-form-item  {
    margin-bottom: 14px;
    .ui-form-item__label {
      display: inline-block;
      text-align: left;
      padding: 0 0 10px;
      font-size: 14px;
      width: 100%;
    }
}
</style>
