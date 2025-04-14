import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { useUserStore } from './stores/user'




const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

const token=localStorage.getItem('token')
axios.defaults.headers.common['Content-Type'] = 'application/json'


if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const userStore = useUserStore()
  userStore.token = token
  userStore.isLoggedIn = true
}
