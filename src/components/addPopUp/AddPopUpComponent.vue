<template>
  <div class="b-popup" v-show="isVisiblePopUp">

    <div class="b-popup-content">
      <div class="title">
      <span>
        Создать новую задачу
      </span>
        <button @click="closePopUp">&times;</button>
      </div>
      <div class="header">
       <span>
         Описание
       </span>
        <input type="text" v-model="newTask" placeholder="Введите описание">
        <span v-show="incorrectData" style="color: red; margin-top: 10px;">Введите данные</span>
      </div>
      <div class="add">
        <button @click="addNewTask"> Создать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPopUpComponent",
  props: {
    isVisiblePopUp: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      newTask: '',
      incorrectData: false
    }
  },
  emits: ["update:isVisiblePopUp", "addTask"],
  mounted() {
    document.addEventListener('keydown', this.pressedKey);
  },
  methods: {
    pressedKey(event) {
      console.log(event)
      if (event.key === 'Escape') {
        this.closePopUp()
      }
      if (event.key === 'Enter') {
        this.addNewTask()
      }
    },
    closePopUp() {
      this.$emit('update:isVisiblePopUp', !this.isVisiblePopUp)
    },
    addNewTask() {
      if (this.newTask) {
        this.$emit('addTask', this.newTask)
        this.closePopUp();
        this.incorrectData = false
      } else
        this.incorrectData = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/popUp";
</style>
