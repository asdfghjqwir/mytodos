import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore=defineStore('user',{
  state: ()=> ({
    token: localStorage.getItem('token') || '',
    isLoggedIn: !!localStorage.getItem('token')
  }),

  actions: {
    setToken(token) {
      this.token=token
      this.isLoggedIn=true
      localStorage.setItem('token',token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout() {
      this.token=''
      this.isLoggedIn=false
      localStorage.removeItem('token')

      delete axios.defaults.headers.common['Authorization']
    }
  }
})