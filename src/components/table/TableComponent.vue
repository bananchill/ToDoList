<template>
  <div class="table_main">
    <table class="table" :cellpadding="1+ headers.length">
      <thead>
      <tr class="headers">
        <th class="empty"></th>
        <th
            class="title"
            v-for="(header, index) in headers"
            :key="index"
        >
          <span>
            {{ header.title }}
          </span>
        </th>
      </tr>
      </thead>
      <thead>
      <tr
          v-for="(item, index) in data"
          :key="index"
          class="body"
      >
        <td class="td_checkBox">
          <input type="checkbox" :class="'checkbox_'+index" :id="'checkbox_' + index"
                 :checked="item.status === 'Выполнено'" @change="changeCheck(item)">
          <label :for="'checkbox_' + index"></label>
        </td>
        <td
            v-for="(value, index) in item"
            :key="index"
            class="data"
        >
          <span :style="{
              color: value === `Выполнено`? `var(--completed100)` :
              value === `В работе` ?  `var(--inWork100)` : `black`,
            }">
           {{ value }}
          </span>
        </td>
      </tr>
      </thead>
    </table>

  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
    headers: {
      type: Object,
      default: () => {
      },
    },
  },
  emits: ['changeStatus'],
  methods: {
    changeCheck(item) {
     this.$emit('changeStatus', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/tableComp";
</style>
