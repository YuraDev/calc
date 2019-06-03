<template>
  <button
      class="ui-button"
      @click="handleClick"
      :disabled="disabled || loading"
      :autofocus="autofocus"
      :type="nativeType"
      :class="[
        type ? 'ui-button--' + type : '',
      {
          'is-disabled': disabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round,
          'is-circle': circle
      }
      ]">
      <i class="ui-icon-loading" v-if="loading"></i>
      <i :class="'icon-' + icon" v-if="icon && !loading"></i>
      <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

