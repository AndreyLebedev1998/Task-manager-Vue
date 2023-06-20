import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      todos: [],
      input: "",
    };
  },
  mutations: {
    getAllTodos(state, data) {
      state.todos = data;
    },

    addTodo(state, data) {
      state.todos.push(data);
    },

    removeTodo(state, id) {
      console.log(id);
      //state.todos.splice(id - 1, 1);
      state.todos = state.todos.filter((el) => {
        return el.id !== id.id;
      });
    },
    completedTodo(state, data) {
      state.todos = state.todos.map((el) => {
        if (el.id === data.id) {
          el.completed = !el.completed;
        }
        return el;
      });
    },
  },
  actions: {
    async getTodos({ commit }) {
      await axios
        .get("http://localhost:5000/todos")
        .then((res) => res.data)
        .then((data) => {
          commit("getAllTodos", data);
          return data;
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
    },
    async postTodo({ commit }, data) {
      const response = await axios.post("http://localhost:5000/todos", data);
      commit("addTodo", response.data);
      this.state.input = "";
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`http://localhost:5000/todos/${id.id}`);
      commit("removeTodo", id);
    },
    async patchTodo({ commit }, data) {
      await axios.patch(`http://localhost:5000/todos/${data.id}`, {
        completed: !data.completed,
      });
      commit("completedTodo", data);
    },
  },
});

export default store;
