<template>
  <Pod
    :sortUp="rowIndex > 0 ? sortUp : undefined"
    :sortDown="rowIndex + 1 < grid.rows.length ? sortDown : undefined"
    :edit="edit"
    :remove="remove"
    :title="'Row ' + (rowIndex + 1)"
    :settings="row.settings"
    :tier="1"
    class="wrapper"
  >
    <div class="row">
      <div
        :class="['column', 'layout' + row.layout, 'col' + index]"
        :key="'col' + Math.random()"
        v-for="(column, index) in row.columns"
      >
        <div class="addColumn" v-if="index === 0 && row.columns.length < 3">
          <Add :targetIndex="index" @onAdd="addColumn" />
        </div>
        <Column :rowIndex="rowIndex" :colIndex="index" :grid="grid" :updateGrid="updateGrid" />
        <div class="addColumn" v-if="row.columns.length < 3">
          <Add :targetIndex="index + 1" @onAdd="addColumn" />
        </div>
      </div>
    </div>
  </Pod>
</template>

<script>
import Column from './Column.vue';
import Pod from './Pod.vue';

var emptyColumn = {
  blocks: [],
};

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
      row: this.grid.rows[this.rowIndex],
    };
  },
  methods: {
    addColumn: function (index) {
      // Calculate new grid
      var newGrid = JSON.parse(JSON.stringify(this.grid));
      newGrid.rows[this.rowIndex].columns.splice(index, 0, { ...emptyColumn });

      // Determine new row layout
      if (newGrid.rows[this.rowIndex].columns.length === 2) {
        newGrid.rows[this.rowIndex].layout = '1_1';
      }
      if (newGrid.rows[this.rowIndex].columns.length === 3) {
        newGrid.rows[this.rowIndex].layout = '1_1_1';
      }

      this.updateGrid(newGrid);
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
.column {
  display: flex;
  align-items: center;
  width: 100%;
}
.addColumn {
}
.layout1_2.col0 {
  width: 33%;
}
.layout1_2.col1 {
  width: 67%;
}
.layout2_1.col0 {
  width: 67%;
}
.layout2_1.col1 {
  width: 33%;
}
.layout_1_1_1 {
  width: 33%;
}
</style>
