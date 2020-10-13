<template>
  <div class="container">
    <template v-for="(row, index) in grid.rows">
      <div class="addRow" v-if="index == 0"><Add v-on:click="addRow" /></div>
      <Row :grid="grid" :rowIndex="index" :updateGrid="updateGrid" />
      <div class="addRow"><Add v-on:click="addRow" /></div>
    </template>
  </div>
</template>

<script>
import Row from './Row.vue';

export default {
  components: {
    Row,
  },
  props: {
    grid: {
      required: true,
      type: Object,
    },
    updateGrid: {
      type: Function,
    },
  },
  methods: {
    addRow: function () {
      alert('adding');
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin: 20px;
}
.addRow {
  display: inline-block;
  width: 10px;
  padding: 20px;
}
</style>
