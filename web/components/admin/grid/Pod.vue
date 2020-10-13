<template>
  <div class="pod">
    <div class="top">
      <div class="title">{{ title }}</div>
      <iconify-icon
        class="icon"
        v-if="sortLeft"
        :width="iconWidth"
        icon="arrowLeftBold"
        :inline="true"
        v-on:click="sortLeft"
      />
      <iconify-icon
        class="icon"
        v-if="sortRight"
        :width="iconWidth"
        icon="arrowRightBold"
        :inline="true"
        v-on:click="sortRight"
      />
      <iconify-icon
        class="icon"
        v-if="sortUp"
        :width="iconWidth"
        icon="arrowUpBold"
        :inline="true"
        v-on:click="sortUp"
      />
      <iconify-icon
        class="icon"
        v-if="sortDown"
        :width="iconWidth"
        icon="arrowDownBold"
        :inline="true"
        v-on:click="sortDown"
      />
      <iconify-icon
        class="icon"
        v-if="edit"
        :width="iconWidth"
        icon="wrenchOutline"
        :inline="true"
        v-on:click="edit"
      />
      <iconify-icon
        class="icon"
        v-if="remove"
        :width="iconWidth"
        icon="trashCanOutline"
        :inline="true"
        v-on:click="remove"
      />
    </div>
    <div class="bottom">
      <div class="settings">
        <div class="setting" v-for="(value, key) in adjustedSettings">
          <div class="label">{{ key }}:</div>
          <div class="value">
            <div v-if="typeof value !== 'object'">
              {{ value }}
            </div>
            <div v-if="typeof value === 'object'">
              <div v-for="(subValue, subKey) in value">{{ subValue }}<br /></div>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import IconifyIcon from '@iconify/vue';
import trashCanOutline from '@iconify-icons/mdi/trash-can-outline';
import arrowUpBold from '@iconify-icons/mdi/arrow-up-bold';
import arrowDownBold from '@iconify-icons/mdi/arrow-down-bold';
import arrowLeftBold from '@iconify-icons/mdi/arrow-left-bold';
import arrowRightBold from '@iconify-icons/mdi/arrow-right-bold';
import wrenchOutline from '@iconify-icons/mdi/wrench-outline';

IconifyIcon.addIcon('trashCanOutline', trashCanOutline);
IconifyIcon.addIcon('arrowUpBold', arrowUpBold);
IconifyIcon.addIcon('arrowDownBold', arrowDownBold);
IconifyIcon.addIcon('arrowLeftBold', arrowLeftBold);
IconifyIcon.addIcon('arrowRightBold', arrowRightBold);
IconifyIcon.addIcon('wrenchOutline', wrenchOutline);

export default {
  components: {
    IconifyIcon,
  },
  props: {
    sortUp: {
      type: Function,
    },
    sortDown: {
      type: Function,
    },
    sortLeft: {
      type: Function,
    },
    sortRight: {
      type: Function,
    },
    edit: {
      type: Function,
    },
    remove: {
      type: Function,
    },
    title: {
      type: String,
    },
    settings: {
      type: Object,
    },
  },
  data: function () {
    var adjustedSettings = {};
    if (typeof this.settings !== 'undefined') {
      Object.keys(this.settings).map((key) => {
        var currValue = this.settings[key];
        if (typeof this.settings[key] === 'object') {
          currValue = {};
          Object.keys(this.settings[key]).map((valKey) => {
            currValue[
              valKey.replace(/_/gi, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
            ] = this.settings[key][valKey];
          });
        }
        adjustedSettings[
          key.replace(/_/gi, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        ] = currValue;
      });
    }
    return {
      iconWidth: 16,
      adjustedSettings,
    };
  },
};
</script>

<style scoped>
.pod {
  width: 100%;
  font-family: arial;
}
.top {
  background-color: #dae4eb;
  font-size: 12px;
  border: 1px solid #888;
  padding: 8px;
  display: flex;
  text-align: right;
}
.title {
  width: 100%;
  text-align: left;
  font-weight: bold;
}
.bottom {
  padding: 14px;
  border-width: 0px 1px 1px 1px;
  border-radius: 0 0 4px 4px;
  border-color: #888;
  border-style: solid;
}
.settings {
  text-align: left;
  font-size: 12px;
}
.label {
  display: inline-block;
  width: 120px;
  vertical-align: top;
}
.value {
  display: inline-block;
  width: calc(100% - 125px);
}
.icon {
  cursor: pointer;
}
</style>
