<template>
  <div class="container-fluid px-3 d-flex justify-content-center" style="padding-top: 4rem;">
    <div class="bg-light p-5 shadow rounded w-100" style="max-width: 960px;">
    <h1 class="mb-4 text-start">Todoリスト</h1>

    <!-- 追加フォーム -->
    <form @submit.prevent="handleSubmit" class="row g-2 align-items-center mb-4">
      <div class="col-12 col-md-10">
      <input
       v-model="store.newTodo" 
       placeholder="新しいTodoを入力"
       class="form-control form-control-lg w-100" 
       />
      </div>
      <div class="col-12 col-md-2">
      <button type="submit" class="btn btn-primary w-100">追加</button>
      </div>
    </form>

    <!-- Todoがないときのメッセージ -->
    <div v-if="store.todos.length === 0" class="text-muted text-center my-4">
    まだTodoはありません。
    </div>

    <!-- Todo一覧 -->
    <ul class="list-group" v-else>
      <li 
       v-for="todo in store.todos"
       :key="todo.id"
       class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2"
       >
        <!-- チェックボックスで完了状態を切り替え -->
        <div class="d-flex align-items-center">
        <input
         type="checkbox"
         class="form-check-input me-2"
         v-model="todo.completed" 
         @change="store.toggleCompleted(todo)" 
         />
        </div>

        <!-- 編集モード -->
        <div class="flex-grow-1 w-100">
        <div v-if="store.editId === todo.id" class="d-flex flex-column flex-md-row gap-2">
          <input v-model="store.editTitle" class="form-control form-control-lg" />
          <button @click="store.updateTodo(todo.id)" class="btn btn-success btn-sm">保存</button>
          <button @click="store.cancelEdit" class="btn btn-secondary btn-sm">キャンセル</button>
        </div>

        <!-- 表示モード -->
        <div v-else class="d-flex justify-content-between align-items-center">
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }" class="me-2">
            {{ todo.title }}
          </span>
          <div class="btn-group btn-group-sm">
          <button @click="store.startEdit(todo)" class="btn btn-outline-primary">編集</button>
          <button @click="store.deleteTodo(todo.id)" class="btn btn-outline-danger">削除</button>
        </div>
      </div>
     </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo.js'

const store = useTodoStore()

onMounted(() => {
  store.fetchTodos()
})

const handleSubmit = () => {
  if (!store.newTodo.trim()) {
    alert('Todoを入力してください')
    return
  }
  store.addTodo()
}
</script>