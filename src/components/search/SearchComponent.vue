<template>
  <div class="search">
    <div class="search_icon">
      <div id="s-circle"></div>
      <div class="stick">
        <span></span>
      </div>
    </div>
    <div class="input_text">
      <input type="text" class="text" v-model="inputText" placeholder="Поиск Имени, статусу или дате">
    </div>

  </div>
</template>

<script>


export default {
  name: "SearchComponent",
  props:{
    storage: {
      type: String,
      default: () => ""
    },
  },
  data() {
    return {
      inputText: "",
    }
  },
  emits: ['inputSearch'],
  watch: {
    storage(){
      this.inputText = this.storage
    },
    inputText() {
      this.sendInputData()
    }
  },
  methods: {
    sendInputData() {
      this.$emit('inputSearch', this.inputText)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/search";

</style>
