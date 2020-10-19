<template>
  <div class="container">
    <div :key="'row' + Math.random()" v-for="(row, index) in grid.rows">
      <div class="addRow" v-if="index == 0"><Add :targetIndex="index" @onAdd="addRow" /></div>
      <Row :grid="grid" :rowIndex="index" :updateGrid="updateGrid" />
      <div class="addRow"><Add :targetIndex="index + 1" @onAdd="addRow" /></div>
    </div>
  </div>
</template>

<script>
import Row from './Row.vue';

var emptyRow = {
  columns: [
    {
      blocks: [],
    },
  ],
};

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
    addRow: function (index) {
      var newGrid = JSON.parse(JSON.stringify(this.grid));
      newGrid.rows.splice(index, 0, { ...emptyRow });
      this.updateGrid(newGrid);
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
  padding: 20px;
}
</style>
