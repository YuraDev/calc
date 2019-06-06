<template>
  <div>
    <ui-header/>
    <div class='wrap'>
      <ui-row :gutter="20" >
        <ui-col :xs="24" :sm="24" :md="8" :lg="7">
          <div class="slidebar">
              <div class="card" v-if="$slots.calc">
                <slot name="calc"/>
              </div>
          </div>
        </ui-col>
        <ui-col :xs="24" :sm="24" :md="16" :lg="17">
          <div class="content">
              <div class="forecast" v-if="$slots.forecast">
                <slot name="forecast"/>
              </div>
          </div>
        </ui-col>
      </ui-row>
    </div>
  </div>
</template>
<script>
import uiHeader from "@/components/header";
export default {
  name: 'layout-page',
   components: { uiHeader },
}
</script>
