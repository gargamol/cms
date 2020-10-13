<template>
  <div class="column">
    <Pod
      :sortLeft="colIndex > 0 ? sortLeft : undefined"
      :sortRight="colIndex + 1 < grid.rows[rowIndex].columns.length ? sortRight : undefined"
      :edit="edit"
      :remove="grid.rows[rowIndex].columns.length > 1 ? remove : undefined"
      :title="'Column ' + (colIndex + 1)"
      :settings="column.settings"
      :tier="2"
    >
      <div class="addBlock"><Add :targetIndex="0" /></div>
      <div :key="Math.random()" v-for="(block, index) in column.blocks">
        <Block
          :rowIndex="rowIndex"
          :colIndex="colIndex"
          :blockIndex="index"
          :grid="grid"
          :updateGrid="updateGrid"
        />
        <div class="addBlock"><Add :targetIndex="index + 1" @onAdd="addBlock" /></div>
      </div>
    </Pod>
  </div>
</template>

<script>
import Block from './Block.vue';
import Pod from './Pod.vue';

export default {
  components: {
    Block,
  },
  props: {
    grid: {
      type: Object,
      required: true,
    },
    updateGrid: {
      type: Function,
    },
    rowIndex: {
      type: Number,
    },
    colIndex: {
      type: Number,
    },
  },
  methods: {
    addBlock: function () {
      alert('adding');
    },
    updateLayout: function () {
      var newGrid = { ...this.grid };
      if (newGrid.rows[this.rowIndex].layout === '1_2') {
        newGrid.rows[this.rowIndex].layout === '2_1';
      } else if (newGrid.rows[this.rowIndex].layout === '2_1') {
        newGrid.rows[this.rowIndex].layout === '1_2s';
      }
      return newGrid;
    },
    sortLeft: function () {
      var newGrid = this.updateLayout();
      newGrid.rows[this.rowIndex].columns.splice(
        this.colIndex - 1,
        0,
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1)[0]
      );
      this.updateLayout(newGrid);
    },
    sortRight: function () {
      var newGrid = { ...this.grid };
      newGrid.rows[this.rowIndex].columns.splice(
        this.colIndex + 1,
        0,
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1)[0]
      );
      this.updateLayout(newGrid);
    },
    edit: function () {
      alert('editing ' + this.colIndex);
      this.updateGrid(this.colIndex);
    },
    remove: function () {
      this.expanded = false;
      if (confirm('Are you sure you wish to delete this column?')) {
        // Calculate new grid
        var newGrid = { ...this.grid };
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1);

        // Determine new row layout
        if (newGrid.rows[this.rowIndex].columns.length === 2) {
          newGrid.rows[this.rowIndex].layout = '1_1';
        }
        if (newGrid.rows[this.rowIndex].columns.length === 1) {
          delete newGrid.rows[this.rowIndex].layout;
        }

        this.updateGrid(newGrid);
      }
    },
  },
  data: function () {
    return {
      column: this.grid.rows[this.rowIndex].columns[this.colIndex],
    };
  },
};
</script>

<style scoped>
.column {
  width: 100%;
  margin: 14px;
}
</style>
