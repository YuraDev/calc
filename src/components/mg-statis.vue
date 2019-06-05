<template>
  <div class="card statis">
    <div :class="['statis--icon', 'is-' + color]" v-if="icon">
      <ui-icon :name="icon"/>
    </div>
    <span class="statis--value">
      <ui-animated-number :value="value"/>
    </span>
    <div class="statis--label"> {{label}}</div>
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
    color: {
      type: String,
      default: 'primary'
    },
    value: {
      type: Number,
      default: 0
    },
    label: String
  }
}
</script>