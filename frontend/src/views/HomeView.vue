<template>
  <div>
    <h1>Todoリスト</h1>

    <!-- 追加フォーム -->
    <form @submit.prevent="store.addTodo">
      <input v-model="store.newTodo" placeholder="新しいTodoを入力" />
      <button type="submit">追加</button>
    </form>

    <!-- Todo一覧 -->
    <ul>
      <li v-for="todo in store.todos" :key="todo.id">
        <!-- チェックボックスで完了状態を切り替え -->
        <input type="checkbox" v-model="todo.completed" @change="store.toggleCompleted(todo)" />

        <!-- 編集モード -->
        <div v-if="store.editId === todo.id">
          <input v-model="store.editTitle" />
          <button @click="store.updateTodo(todo.id)">保存</button>
          <button @click="store.cancelEdit">キャンセル</button>
        </div>

        <!-- 表示モード -->
        <div v-else>
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
          </span>
          <button @click="store.startEdit(todo)">編集</button>
          <button @click="store.deleteTodo(todo.id)">削除</button>
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