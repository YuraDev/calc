<template>
    <div :class="[
        'ui-input-number',
        { 'is-disabled': disabled },
      ]">
      
     
      <ui-input
        :placeholder="placeholder"
        :disabled="disabled"
        :label="label"
        :value="inputValue"
        @keydown.up.native.prevent="increase"
        @keydown.down.native.prevent="decrease"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @change="handleChange"> 
        <template slot="prefix">
          <!-- <i class="ui-input__icon icon-minus"></i> -->
          <span
            class="ui-input-number__btn" 
            @click="decrease" @keydown.enter="decrease" :class="{'is-disabled': minDisabled}" >
            <i class="ui-input__icon icon-minus"></i>
          </span>
        </template>
        <template slot="suffix">
          <span
            class="ui-input-number__btn"  @click="increase" :class="{'is-disabled': maxDisabled}" @keydown.enter="increase">
            <i class="ui-input__icon icon-plus" ></i>
          </span>
        </template>
      </ui-input>
    </div>
</template>
<script>
const isNaN = Number.isNaN || window.isNaN
export default {
  props: {
    value: {},
    label: String,
    disabled: Boolean,
    placeholder: String,
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    precision: {
      type: Number,
      validator (val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    }
  },
  data: () => ({
    num: 0,
    userValue: null
  }),
  computed: {
    inputValue () {
      if (this.userValue !== null) {
        return this.userValue
      }
      return this.num
    },
    minDisabled () {
      return this.compute(0) < this.min
    },
    maxDisabled () {
      return this.compute(1) > this.max
    },
    _precision () {
      const step = this.getPrecision(this.step)
      if (this.precision !== undefined) {
        if (step > this.precision) {
          // console.warn('[UI Warn][InputNumber]precision should not be less than the decimal places of step')
        }
        return this.precision
      }
      return Math.max(this.getPrecision(this.value), step)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.setValue(val)
      }
    }
  },
  methods: {
    increase () {
      if (this.disabled || this.maxDisabled) return
      this.setValue(
        this.compute(1)
      )
    },
    decrease () {
      if (this.disabled || this.minDisabled) return
      this.setValue(
        this.compute(0)
      )
    },
    handleFocus () {
      this.$emit('focus', event)
      this.$emit('change', this.mum)
    },
    handleBlur () {
      this.$emit('blur', event)
    },
    handleInput (value) {
      this.$set(this, 'userValue', value)
    },
    handleChange (value) {
      this.setValue(value)
    },
    normalize (value, precision) {
      // console.log(this._precision)
      return parseFloat(
        Number(value).toFixed(
          precision === undefined ? this._precision : precision
        )
      )
    },
    getPrecision (val) {
      if (val === undefined) return 0
      const str = val.toString()
      const dot = str.indexOf('.')
      return dot !== -1 ? str.length - dot - 1 : 0
    },
    compute (type) {
      let val = isNaN(this.num) ? 0 : this.num
      const factor = Math.pow(10, this._precision)
      let a = factor * val
      let b = factor * this.step
      return (type ? a + b : a - b) / factor
    },
    setValue (value) {
      // console.log('setValue', value)
      let old = this.num
      let num = Number(value)
      if (old === num) return false
      this.num = isNaN(num) ? old : this.normalize(this.min <= this.max ? Math.min(this.max, Math.max(this.min, num)) : num)
      this.userValue = null
      this.$emit('input', this.num)
    }
  }
}
</script>
