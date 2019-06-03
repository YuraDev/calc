<template>
  <div class='wrap'>
    <ui-row :gutter="20" >
      <ui-col :span="8" :xs="24" :sm="24" :md="8" :lg="7">
        <div class="slidebar">
            <div class="card" v-if="$slots.calc">
              <slot name="calc"/>
            </div>
        </div>
      </ui-col>
      <ui-col :span="8" :xs="24" :sm="24" :md="16" :lg="17">
        <div class="content">
            <div class="forecast" v-if="$slots.forecast">
              <slot name="forecast"/>
            </div>
        </div>
      </ui-col>
    </ui-row>
  </div>
</template>
<script>
export default {
  name: 'layout-page'
}
</script>
