<template>
  <div class='wrap'>
    <div class="slidebar">
        <div class="card" v-if="$slots.calc">
          <slot name="calc"/>
        </div>
    </div>
     <div class="content">
        <div class="forecast" v-if="$slots.forecast">
          <slot name="forecast"/>
        </div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'layout-page'
}
</script>
