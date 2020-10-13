<template>
  <div class="block">
    <Pod
      :sortUp="blockIndex > 0 ? sortUp : undefined"
      :sortDown="
        blockIndex + 1 < grid.rows[rowIndex].columns[colIndex].blocks.length ? sortDown : undefined
      "
      :edit="edit"
      :remove="remove"
      :title="'Block ' + (blockIndex + 1) + ' - ' + block.type"
      :settings="block.settings"
    >
    </Pod>
  </div>
</template>

<script>
import Pod from './Pod.vue';

export default {
  components: { Pod },
  props: {
    grid: {
      type: Object,
      required: true,
    },
    updateGrid: {
      type: Function,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    colIndex: {
      type: Number,
      required: true,
    },
    blockIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    sortUp: function () {
      var newGrid = { ...this.grid };
      newGrid.rows[this.rowIndex].columns[this.colIndex].blocks.splice(
        this.blockIndex - 1,
        0,
        newGrid.rows[this.rowIndex].columns[this.colIndex].blocks.splice(this.blockIndex, 1)[0]
      );
      this.updateGrid(newGrid);
    },
    sortDown: function () {
      var newGrid = { ...this.grid };
      newGrid.rows[this.rowIndex].columns[this.colIndex].blocks.splice(
        this.blockIndex + 1,
        0,
        newGrid.rows[this.rowIndex].columns[this.colIndex].blocks.splice(this.blockIndex, 1)[0]
      );
      this.updateGrid(newGrid);
    },
    edit: function () {
      alert('editing ' + this.blockIndex);
      this.updateGrid(this.blockIndex);
    },
    remove: function () {
      this.expanded = false;
      if (confirm('Are you sure you wish to delete this block?')) {
        var newGrid = { ...this.grid };
        console.log('new grid', newGrid);
        newGrid.rows[this.rowIndex].columns[this.colIndex].blocks.splice(this.blockIndex, 1);
        setTimeout(function () {
          this.updateGrid(newGrid);
        }, 300);
      }
    },
  },
  data: function () {
    return {
      block: this.grid.rows[this.rowIndex].columns[this.colIndex].blocks[this.blockIndex],
    };
  },
};
</script>

<style scoped>
.block {
  margin: 14px;
}
</style>
