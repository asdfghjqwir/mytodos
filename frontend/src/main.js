import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'




const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

const token=localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
