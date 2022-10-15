<template>
  <div class="main">
    <div class="top_lvl">
      <div class="title">
        <span>
          To do list
       </span>
      </div>
      <div class="add_TODO" @click="toggleVisiblePopup">
      </div>
    </div>
    <div class="sorted">
      <SearchComponent
          :storage="inputSearch"
          @inputSearch="setInputSearch"
          class="search"/>
      <SortedComponent
          :storage="howSearch"
          :sortingBy="sortingBy"
          @howSearch="setSearchBy"
      />
    </div>
    <div class="view_data">
      <TableComponent
          :data="findData"
          :headers="sortingBy"
          @changeStatus="changeStatusItem"
      />
    </div>

  </div>
  <addPopUpComponent v-model:isVisiblePopUp="isVisiblePopUp" @addTask="addNewTask"/>
</template>
<script>
import SearchComponent from "@/components/search/SearchComponent";
import SortedComponent from "@/components/sorted/SortedComponent";
import TableComponent from "@/components/table/TableComponent";
import addPopUpComponent from "@/components/addPopUp/AddPopUpComponent";
import {markRaw} from 'vue';

let data = [
  {
    description: "Размещение новостей на сайте",
    status: "Выполнено",
    date: "22.04.2022",
  },
  {
    description: "Внедрить Wi-fi для читателей",
    status: "В работе",
    date: "25.03.2022",
  },
  {
    description: "Отредактировать раздел “Доступная среда”",
    status: "Выполнено",
    date: "15.03.2022",
  },

  {
    description: "Презентация “Информационные технологии”",
    status: "В работе",
    date: "15.03.2022",
  },
  {
    description: "Сверстать новый layout",
    status: "В работе",
    date: "09.03.2022",
  },
  {
    description: "Скролл в новостях",
    status: "Выполнено",
    date: "07.03.2022",
  },
  {
    description: "Форма сброса пароля",
    status: "В работе",
    date: "25.02.2022",
  }, {
    description: "Внедрение модуля Chat",
    status: "Выполнено",
    date: "20.02.2022",
  },
] // использую это, так как нет сервера и не могу взять другие данные похожие в фигме
// eslint-disable-next-line no-unused-vars
const sortingBy = [
  {
    name: "description",
    title: "Описание",

  },
  {
    name: "status",
    title: "Статус",

  }, {
    name: "date",
    title: "Дата",

  },
]
export default {
  name: 'AppPage',
  components: {
    SearchComponent,
    SortedComponent,
    TableComponent,
    addPopUpComponent
  },
  data() {
    return {
      data: markRaw(data),
      sortingBy: markRaw(sortingBy),
      howSearch: markRaw(sortingBy[0]),
      inputSearch: "",
      changeStatus: {
        type: Object,
        default: () => {
        }
      },
      isVisiblePopUp: false
    }
  },
  computed: {
    findData(find) {
      let filtredData = [];
      if (!find) {
        filtredData = this.data
      } else {
        switch (this.howSearch.name) {
          case "date":
            filtredData = this.data.filter(value => value.date.includes(this.inputSearch))
            break;
          case "status":
            filtredData = this.data.filter(
                value => value.status.toLowerCase().includes(this.inputSearch.toLowerCase()))
            break;
          case "description":
            filtredData = this.data.filter(
                value => value.description.toLowerCase().includes(this.inputSearch.toLowerCase()))
            break;
        }
      }
      return filtredData
    }
  },
  mounted() {
    const data = localStorage.getItem("data_storage")
    if (data) {
      const obj = JSON.parse(data)
      this.data = obj.data
      this.inputSearch = obj.inputData
      this.howSearch = obj.search
    }
  },
  watch: {
    changeStatus() {
      this.changeStatusItem()
    },
    data() {

    }

  },
  methods: {
    setInputSearch(data) {
      this.inputSearch = data
      this.setStorage()
    },
    setSearchBy(newData) {
      this.howSearch = newData
      this.setStorage()
    },
    async changeStatusItem(item) {
      this.data.filter(value => item === value).forEach(
          value => {
            if (value.status === 'В работе')
              value.status = 'Выполнено'
            else
              value.status = 'В работе'
          }
      )
      this.setStorage()
    },
    setStorage() {
      const dataStorage = {
        data: this.data,
        inputData: this.inputSearch,
        search: this.howSearch

      }
      localStorage.setItem("data_storage", JSON.stringify(dataStorage))
      this.findData
    },
    toggleVisiblePopup() {
      this.isVisiblePopUp = !this.isVisiblePopUp
    },
    addNewTask(newItem) {
      let today = new Date();
      const newObject = {
        description: newItem,
        status: "В работе",
        date: String(today.getDate()).padStart(2, '0') + '.' +
            String(today.getMonth() + 1).padStart(2, '0') + '.' + today.getFullYear()
      }
      this.data.push(newObject);

      this.setStorage()

    }

  }
}
</script>
<style lang="scss" scoped>
@import "styles/app";
</style>
