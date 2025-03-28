// src/stores/todo.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const editId = ref(null)

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/todos')
      todos.value = res.data
    } catch (error) {
      console.error('GETエラー:', error)
    }
  }

  const addTodo = async (title) => {
    if (!title.trim()) {
      alert("タイトルを入力してください")
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/todos', {
        todo: {
          title: title,
          completed: false
        }
      })
      todos.value.push(res.data)
    } catch (error) {
      console.error('POSTエラー', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (error) {
      console.error('DELETEエラー', error)
    }
  }

  const startEdit = (todo) => {
    editId.value = todo.id
  }

  const cancelEdit = () => {
    editId.value = null
  }

  const updateTodo = async (id, newTitle) => {
    if (!newTitle.trim()) {
      alert("タイトルを入力してください")
      return
    }

    try {
      const res = await axios.patch(`http://localhost:3000/todos/${id}`, {
        todo: {
          title: newTitle,
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

  const toggleCompleted = async (todo) => {
    try {
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

  return {
    todos,
    editId,
    fetchTodos,
    addTodo,
    deleteTodo,
    startEdit,
    cancelEdit,
    updateTodo,
    toggleCompleted
  }
})
