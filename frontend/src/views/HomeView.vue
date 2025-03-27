<template>
  <div>
    <h1>Todoリスト</h1>

    <!-- 追加フォーム -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="新しいTodoを入力" />
      <button type="submit">追加</button>
    </form>

    <!-- Todo一覧 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- チェックボックスで完了状態を切り替え -->
        <input type="checkbox" v-model="todo.completed" @change="toggleCompleted(todo)" />

        <!-- 編集モード -->
        <div v-if="editId === todo.id">
          <input v-model="editTitle" />
          <button @click="updateTodo(todo.id)">保存</button>
          <button @click="cancelEdit">キャンセル</button>
        </div>

        <!-- 表示モード -->
        <div v-else>
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
          </span>
          <button @click="startEdit(todo)">編集</button>
          <button @click="deleteTodo(todo.id)">削除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const todos = ref([])
const newTodo = ref('')
const editId = ref(null)
const editTitle = ref('')

// 一覧取得
const fetchTodos = async () => {
  try {
    const res = await axios.get('http://localhost:3000/todos')
    todos.value = res.data
  } catch (error) {
    console.error('GETエラー:', error)
  }
}

// 追加
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

// 削除
const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`)
    todos.value = todos.value.filter(todo => todo.id !== id)
  } catch (error) {
    console.error('DELETEエラー:', error)
  }
}

// 編集開始
const startEdit = (todo) => {
  editId.value = todo.id
  editTitle.value = todo.title
}

// 編集キャンセル
const cancelEdit = () => {
  editId.value = null
  editTitle.value = ''
}

// 編集保存
const updateTodo = async (id) => {
  try {
    const res = await axios.patch(`http://localhost:3000/todos/${id}`, {
      todo: {
        title: editTitle.value,
        completed: false
      }
    })
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value[index] = res.data
    }
    cancelEdit()
  } catch (error) {
    console.error('UPDATEエラー:', error)
  }
}

// 完了状態切り替え
const toggleCompleted = async (todo) => {
  try {
    if (!todo.title || !todo.title.trim()) {
      console.warn("タイトルが空のためPATCHしません")
      return
    }

    const res = await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
      todo: {
        title: todo.title,
        completed: todo.completed
      }
    })
    console.log('完了状態更新成功:', res.data)
  } catch (error) {
    console.error('完了状態更新エラー:', error)
  }
}

onMounted(fetchTodos)
</script>
