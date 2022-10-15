<template>
  <div class="sorted">
    <div class="title">
       <span class="sorted_title">
          Сортировать по:
        </span>
    </div>

    <div class="block_combobox" data-state="">
      <select
          v-model="selectedItem"
          class="combobox"
      >
        <option
            v-for="(item,index) in sortingBy"
            :key="index"
            :value="item"
            class="item_combobox"
        >
          {{ item.title }}
        </option>
      </select>
    </div>
  </div>

</template>

<script>
export default {
  name: "SortedComponent",
  props: {
    sortingBy: {
      type: Array,
      default: () => []
    },
    storage: {
      type: String,
      default: "",
    }
  },
  emits: ["howSearch"],
  data() {
    return {
      selectedItem: this.sortingBy[0]
    }
  },

  watch: {
    storage() {
      this.selectedItem = this.storage
    },
    selectedItem() {
      this.sendItem()
    }
  },
  methods: {
    sendItem() {
      if (this.selectedItem)
        this.$emit('howSearch', this.selectedItem)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "styles/sorted";
</style>
