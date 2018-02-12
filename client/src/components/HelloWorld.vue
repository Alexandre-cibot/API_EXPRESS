<template>
  <div class="hello">
    <form v-on:submit.prevent="addTodo">
      <input class="addnew" type="text" placeholder="New todo" v-model.trim="inputText">
    </form>
    <ul>
      <li v-for="todo in todos">
        <span>{{todo.id}}</span>
        <span>{{todo.text}}</span>
        <span>
          <input class="checkboxStatus" type="checkbox" :checked="todo.complete" @click="toggleStatus(todo)">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
const API = 'http://localhost:3000';

export default {
  name: 'HelloWorld',
  data () {
    return {
      todos: [],
      inputText: "",
    }
  },
  methods: {
    addTodo() {
      console.log('AddTodo');
      if (this.inputText)
        axios.post(`${API}/todos/`, {
          text: this.inputText
        })
        .then(response => {
          const newTodo = response.data;
          this.todos.unshift(newTodo);
          this.inputText = "";
        })
    },
    toggleStatus(todo) {
      const complete = !todo.status;
      axios.put(`${API}/todos`, {complete, id: todo.id})
      .then(response => {
        console.log('response', response);
      })
    }
  },
  mounted() {
    axios.get(`${API}/todos`).then((response) => {
      this.todos = response.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    width: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 25px;
  }

  li {
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
    height: 60px;
    align-items: center;
    border-radius: 3px;
  }

  .green {
    background-color: green;
  }

  .blue {
    background-color: blue;
  }
  .checkboxStatus {
    height: 40px;
  }

  input.addnew {
    margin-bottom: 30px;
    width: 200px;
    padding: 10px;
    font-size: 20px;
    border-color: palegreen;
  }
</style>
