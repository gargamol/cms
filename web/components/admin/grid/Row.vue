<template>
  <Pod
    :sortUp="rowIndex > 0 ? sortUp : undefined"
    :sortDown="rowIndex + 1 < grid.rows.length ? sortDown : undefined"
    :edit="edit"
    :remove="remove"
    :title="'Row ' + (rowIndex + 1)"
    :settings="grid.rows[rowIndex].settings"
  >
    <div class="row">
      <div class="addColumn" v-if="grid.rows[rowIndex].columns.length < 3">
        <Add :targetIndex="index" />
      </div>
      <template v-for="(column, index) in grid.rows[rowIndex].columns">
        <Column
          :blocks="column.blocks"
          :rowIndex="rowIndex"
          :colIndex="index"
          :grid="grid"
          :updateGrid="updateGrid"
        />
        <div class="addColumn" v-if="grid.rows[rowIndex].columns.length < 3">
          <Add :targetIndex="index + 1" />
        </div>
      </template>
    </div>
  </Pod>
</template>

<script>
import Column from './Column.vue';
import Pod from './Pod.vue';

export default {
  components: {
    Column,
    Pod,
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
  },
  data: function () {
    return {
      expanded: true,
    };
  },
  methods: {
    addColumn: function () {
      alert('adding');
    },
    sortUp: function () {
      var newGrid = { ...this.grid };
      newGrid.rows.splice(this.rowIndex - 1, 0, newGrid.rows.splice(this.rowIndex, 1)[0]);
      this.updateGrid(newGrid);
    },
    sortDown: function () {
      var newGrid = { ...this.grid };
      newGrid.rows.splice(this.rowIndex + 1, 0, newGrid.rows.splice(this.rowIndex, 1)[0]);
      this.updateGrid(newGrid);
    },
    edit: function () {
      alert('editing ' + this.rowIndex);
      this.updateGrid(this.rowIndex);
    },
    remove: function () {
      this.expanded = false;
      if (confirm('Are you sure you wish to delete this row?')) {
        var newGrid = { ...this.grid };
        newGrid.rows.splice(this.rowIndex, 1);
        this.updateGrid(newGrid);
      }
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
