<template>
  <div class="container">
    <template v-for="(row, index) in grid.rows">
      <div class="addRow" v-if="index == 0"><Add :targetIndex="index" @onAdd="addRow" /></div>
      <Row :grid="grid" :rowIndex="index" :updateGrid="updateGrid" />
      <div class="addRow"><Add :targetIndex="index + 1" @onAdd="addRow" /></div>
    </template>
  </div>
</template>

<script>
import Row from './Row.vue';

var emptyRow = {
  columns: [
    {
      blocks: [
        {
          type: 'new',
        },
      ],
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
      var newGrid = { ...this.grid };
      newGrid.rows.splice(index, 0, { ...emptyRow });
      console.log('grid', this.grid, newGrid);
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
  width: 10px;
  padding: 20px;
}
</style>
