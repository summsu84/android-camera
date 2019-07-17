<template>
  <b-nav-item-dropdown :right="right" :no-caret="noCaret">
    <template slot="button-content">
      histdev1104@gmail.com
    </template>
    <slot>
      <div :style="{ right: 'auto', height: '400px' }">dropdown</div>
    </slot>
  </b-nav-item-dropdown>
</template>
<script>
export default {
  name: 'HeaderDropdown',
  props: {
    right: {
      type: Boolean,
      default: false,
    },
    noCaret: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({ itemsCount: 42 }),
};
</script>
