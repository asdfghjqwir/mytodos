<template>
  <div class="container my-4">
    <h1 class="mb-4">Todoリスト</h1>

    <!-- 追加フォーム -->
    <form @submit.prevent="store.addTodo" class="input-group mb-3">
      <input
       v-model="store.newTodo" 
       placeholder="新しいTodoを入力"
       class="form-control" />
      <button type="submit" class="btn btn-primary">追加</button>
    </form>

    <!-- Todo一覧 -->
    <ul class="list-group">
      <li 
       v-for="todo in store.todos"
       :key="todo.id"
       class="list-group-item d-flex justify-content-between align-items-center"
       >
        <!-- チェックボックスで完了状態を切り替え -->
        <input
         type="checkbox"
         class="form-check-input me-2"
         v-model="todo.completed" 
         @change="store.toggleCompleted(todo)" 
         />

        <!-- 編集モード -->
        <div class="flex-grow-1">
        <div v-if="store.editId === todo.id" class="d-flex gap-2">
          <input v-model="store.editTitle" class="form-control" />
          <button @click="store.updateTodo(todo.id)" class="btn btn-success btn-sm">保存</button>
          <button @click="store.cancelEdit" class="btn btn-secondary btn-sm">キャンセル</button>
        </div>

        <!-- 表示モード -->
        <div v-else class="d-flex justify-content-between align-items-center">
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
          class="me-2"
          >
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
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo.js'

const store = useTodoStore()

onMounted(() => {
  store.fetchTodos()
})
</script>