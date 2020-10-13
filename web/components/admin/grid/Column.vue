<template>
  <div class="column">
    <Pod
      :sortLeft="colIndex > 0 ? sortLeft : undefined"
      :sortRight="colIndex + 1 < grid.rows[rowIndex].columns.length ? sortRight : undefined"
      :edit="edit"
      :remove="grid.rows[rowIndex].columns.length > 1 ? remove : undefined"
      :title="'Column ' + (colIndex + 1)"
      :settings="column.settings"
    >
      <div class="addBlock"><Add :targetIndex="index" /></div>
      <template v-for="(block, index) in column.blocks">
        <Block
          :rowIndex="rowIndex"
          :colIndex="colIndex"
          :blockIndex="index"
          :grid="grid"
          :updateGrid="updateGrid"
        />
        <div class="addBlock"><Add :targetIndex="index + 1" /></div>
      </template>
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
    sortLeft: function () {
      var newGrid = { ...this.grid };
      newGrid.rows[this.rowIndex].columns.splice(
        this.colIndex - 1,
        0,
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1)[0]
      );
      this.updateGrid(newGrid);
    },
    sortRight: function () {
      var newGrid = { ...this.grid };
      newGrid.rows[this.rowIndex].columns.splice(
        this.colIndex + 1,
        0,
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1)[0]
      );
      this.updateGrid(newGrid);
    },
    edit: function () {
      alert('editing ' + this.colIndex);
      this.updateGrid(this.colIndex);
    },
    remove: function () {
      this.expanded = false;
      if (confirm('Are you sure you wish to delete this column?')) {
        var newGrid = { ...this.grid };
        console.log('new grid', newGrid);
        newGrid.rows[this.rowIndex].columns.splice(this.colIndex, 1);
        setTimeout(function () {
          this.updateGrid(newGrid);
        }, 300);
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
