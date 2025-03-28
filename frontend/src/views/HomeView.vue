<template>
  <div>
    <h1>Todoリスト</h1>

    <!-- 追加フォーム -->
    <form @submit.prevent="handleAddTodo">
      <input v-model="newTodo" placeholder="新しいTodoを入力" />
      <button type="submit">追加</button>
    </form>

    <!-- Todo一覧 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggleCompleted(todo)" />

        <!-- 編集モード -->
        <div v-if="editId === todo.id">
          <input v-model="editTitle" />
          <button @click="handleUpdateTodo(todo.id)">保存</button>
          <button @click="cancelEdit">キャンセル</button>
        </div>

        <!-- 表示モード -->
        <div v-else>
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
          </span>
          <button @click="startEdit(todo); editTitle = todo.title">編集</button>
          <button @click="deleteTodo(todo.id)">削除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo.js'

const {
  todos,
  editId,
  fetchTodos,
  addTodo,
  deleteTodo,
  startEdit,
  cancelEdit,
  updateTodo,
  toggleCompleted
} = useTodoStore()

// v-modelで使用するローカル状態
const newTodo = ref('')
const editTitle = ref('')

// ラッパー関数（Piniaの関数に値を渡すため）
const handleAddTodo = async () => {
  await addTodo(newTodo.value)
  newTodo.value = ''
}

const handleUpdateTodo = async (id) => {
  await updateTodo(id, editTitle.value)
}
onMounted(fetchTodos)
</script>
