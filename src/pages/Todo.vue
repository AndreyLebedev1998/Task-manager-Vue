<template>
  <div>
    <RouterLink to="/">На главную</RouterLink>
    <h1>Todo App</h1>
    <form>
      <input
        type="text"
        class="todo"
        @keyup.enter="addTodo($event)"
        v-model="$store.state.input"
      />
      <button class="addTodo" @click="addTodo">Добавить</button>
      <div>
        <div
          class="todokWrapper"
          v-for="todo in $store.state.todos"
          :key="todo.id"
        >
          <input
            type="checkbox"
            @change="completedTodo({ id: todo.id, completed: todo.completed })"
            :checked="todo.completed"
          />
          <p
            :style="{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }"
          >
            {{ todo.title }}
          </p>
          <div class="close" @click="removeTodo({ id: todo.id })">&times;</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getTodos"]),
    addTodo() {
      const title = this.$store.state.input;
      if (title !== "") {
        this.$store.dispatch("postTodo", {
          title,
          completed: false,
        });
      }
    },

    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },

    completedTodo(data) {
      this.$store.dispatch("patchTodo", {
        id: data.id,
        completed: data.completed,
      });
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style scoped></style>
