<template>
  <i :class="'icon icon-' + name"/>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>
