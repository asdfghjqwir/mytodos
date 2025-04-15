import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user' 

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
        const userStore = useUserStore()
        const res = await axios.get('http://localhost:3000/api/v1/todos', {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
            Accept: 'application/json'
          }
        })
        this.todos = res.data
      } catch (error) {
        console.error('GETエラー:', error)
      }
    },

    async addTodo() {
      if (!this.newTodo.trim()) return

      try {
        const userStore = useUserStore()
        const res = await axios.post('http://localhost:3000/api/v1/todos', {
          todo: {
            title: this.newTodo,
            completed: false
          }
        }, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
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
        const userStore = useUserStore()
        await axios.delete(`http://localhost:3000/api/v1/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
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
        const userStore = useUserStore()
        const res = await axios.patch(`http://localhost:3000/api/v1/todos/${id}`, {
          todo: {
            title: this.editTitle,
            completed: false
          }
        }, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
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
          console.warn("タイトルが空のためPATCHしません")
          return
        }

        const userStore = useUserStore()
        const res = await axios.patch(`http://localhost:3000/api/v1/todos/${todo.id}`, {
          todo: {
            title: todo.title,
            completed: todo.completed
          }
        }, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        console.log(`完了状態更新成功:`, res.data)
      } catch (error) {
        console.error(`完了状態更新エラー:`, error)
      }
    }
  }
})