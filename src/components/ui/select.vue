<template>
  <div :class="['ui-select', {'is-active':dropdown}]">
    <div @click.stop="toggle" class="ui-select-toggle">
      <span class="ui-select__inner">{{ selected.value }} </span>
      <span class="ui-select__caret">
        <i :class="['ui-input__icon', 'icon-' + iconClass]"/>
      </span>
    </div>
    <div class="ui-select-dropdown" v-show="dropdown">
      <ul class="ui-select__list" >
        <li class="ui-select-item" v-for="(option, index) in options" :key="index"  @click="updateOption(option.key)">
          {{ option.value }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    disabled: Boolean,
    value: {
      required: true
    }
  },
  data: () => ({
    dropdown: false,
    selectedOption: '+'
  }),
  computed: {
    iconClass () {
      return this.dropdown ? 'arrow-up is-reverse' : 'arrow-up'
    },
    selected () {
      for (let opt of this.options) {
        if (opt.key === this.value) {
          return opt
        }
      }
      return null
    }
  },
  created () {},
  mounted () {},
  methods: {
    updateOption (key) {
      this.toggle()
      this.$emit('update:value', key)
    },
    toggle () {
      this.dropdown = !this.dropdown
      if (this.dropdown) {
        document.addEventListener('click', this.toggle)
      } else {
        document.removeEventListener('click', this.toggle)
      }
    }
  }
}
</script>
