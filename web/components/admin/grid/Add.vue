<template>
  <iconify-icon class="icon" width="18" icon="plusCircle" :inline="true" @click="add" />
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
    targetIndex: {
      type: Number,
    },
  },
  methods: {
    add() {
      if (typeof this.$listeners.onAdd === 'function') {
        alert('exists! ' + typeof this.$listeners.onAdd);
        this.$emit('onAdd', this.targetIndex);
      }
    },
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}
</style>
