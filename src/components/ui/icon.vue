<template>
  <i :class="'icon icon-' + name"/>
</template>

<script>
// colorful
export default {
  props: {
    name: String
  }
}
</script>
