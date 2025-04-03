import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    newTodo: '',
    editId: null,
    editTitle: ''
  }),

  actions: {
    async fetchTodos() {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        this.todos = res.data
      } catch (error) {
        console.error('GETエラー:', error)
      }
    },

    async addTodo() {
      if (!this.newTodo.trim()) return

      try {
        const res = await axios.post('http://localhost:3000/todos', {
          todo: {
            title: this.newTodo,
            completed: false
          }
        })
        this.todos.push(res.data)
        this.newTodo = ''
      } catch (error) {
        console.error('POSTエラー:', error)
      }
    },

    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`)
        this.todos = this.todos.filter(todo => todo.id !== id)
      } catch (error) {
        console.error(`DELETEエラー:`, error)
      }
    },

    startEdit(todo) {
      this.editId = todo.id
      this.editTitle = todo.title
    },

    cancelEdit() {
      this.editId = null
      this.editTitle = ''
    },

    async updateTodo(id) {
      try {
        const res = await axios.patch(`http://localhost:3000/todos/${id}`, {
          todo: {
            title: this.editTitle,
            completed: false
          }
        })
        const index = this.todos.findIndex(todo => todo.id === id)
        if (index !== -1) {
          this.todos[index] = res.data
        }
        this.cancelEdit()
      } catch (error) {
        console.error('UPDATEエラー:', error)
      }
    },

    async toggleCompleted(todo) {
      try {
        if (!todo.title || !todo.title.trim()) {
          console.warn("タイトルがからのためPATCHしません")
          return
        }

        const res = await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
          todo: {
            title: todo.title,
            completed: todo.completed
          }
        })
        console.log(`完了状態更新成功:`, res.data)
      } catch (error) {
        console.error(`完了状態更新エラー:`, error)
      }
    }
  }
})