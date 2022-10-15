import TodosApiModule from "@/apis/helperApiModule/leazing/todosApiModule";

export default class ApiPack {
    install(_app) {
        _app.use(new TodosApiModule())
    }
}
