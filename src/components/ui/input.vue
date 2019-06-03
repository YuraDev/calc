<template>
  <div  :class="[
    'ui-input',
    'ui-input--' + color,
    {
      'is-disabled': disabled,
      'is-loading': loading,
      'is-round': round,
       'ui-input--prefix': $slots.prefix,
       'ui-input--suffix': $slots.suffix,
    }]" >
    <input
      class="ui-input__inner"
      ref="input"
      :type="type"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-label="label"
      v-bind="$attrs"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    <div class="ui-input__prefix" v-if="$slots.prefix">
      <slot name="prefix"/>
    </div>
    <div  class="ui-input__suffix" v-if="$slots.suffix">
      <slot name="suffix"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    loading: Boolean,
    round: Boolean,
    color: {
      type: String,
      default: 'default'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data: () => ({
    query: '',
    // hovering: false,
    focused: false,
    isComposing: false
  }),
  computed: {
    nativeValue () {
      return this.value
    }
  },
  mounted () {
    this.setNativeValue()
  },
  watch: {
    nativeValue () {
      this.setNativeValue()
    }
  },
  methods: {
    getField () {
      return this.$refs.input
    },
    select () {
      this.getField().select()
    },
    focus () {
      this.getField().focus()
    },
    blur () {
      this.getField().blur()
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd () {
      this.isComposing = false
      this.handleInput(event)
    },
    handleInput (event) {
      if (this.isComposing) return
      if (event.target.value === this.nativeValue) return
      this.$emit('input', event.target.value)
      this.$emit('update:value', event.target.value)
      this.$nextTick(this.setNativeValue)
    },
    handleFocus () {
      this.focused = true
      this.$emit('focus', event)
    },
    handleBlur () {
      this.focused = false
      this.$emit('blur', event)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
    },
    clear () {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    setNativeValue () {
      const input = this.getField()
      if (!input) return
      if (input.value === this.nativeValue) return
      input.value = this.nativeValue
    }
  }
}
</script>
