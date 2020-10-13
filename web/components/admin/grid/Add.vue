<template>
  <iconify-icon class="icon" width="18" icon="plusCircle" :inline="true" v-on:click="add" />
</template>

<script>
import IconifyIcon from '@iconify/vue';
import plusCircle from '@iconify-icons/mdi/plus-circle-outline';

IconifyIcon.addIcon('plusCircle', plusCircle);

export default {
  components: {
    IconifyIcon,
  },
  props: {
    add: {
      type: Function,
    },
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}
</style>
