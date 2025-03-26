<template>
  <div>
    <h1>Todoリスト</h1>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="新しいTodoを入力" />
      <button type="submit">追加</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const todos = ref([])
const newTodo = ref('')

// 一覧取得（GET）
const fetchTodos = async () => {
  try {
    const res = await axios.get('http://localhost:3000/todos')
    todos.value = res.data  // ←これだけでOK
  } catch (error) {
    console.error('GETエラー:', error)
  }
}

// 追加処理（POST）
const addTodo = async () => {
  if (!newTodo.value.trim()) return

  try {
    const res = await axios.post('http://localhost:3000/todos', {
      todo: {
        title: newTodo.value,
        completed: false
      }
    })
    todos.value.push(res.data)
    newTodo.value = ''
  } catch (error) {
    console.error('POSTエラー:', error)
  }
}

// 初期表示時に一覧取得
onMounted(fetchTodos)
</script>
