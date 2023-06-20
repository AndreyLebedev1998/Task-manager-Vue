import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import Todo from "./pages/Todo.vue";

const app = createApp(App);
app.component("todo", Todo);
app.use(router);
app.use(store);
app.mount("#app");
