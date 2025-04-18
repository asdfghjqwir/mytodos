<template>
    <div class="container-fluid px-3 d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="bg-light p-5 shadow rounded w-100" style="max-width: 720px;">
  <h2 class="mb-4  text-start">ログイン</h2>

  
  <form @submit.prevent="handleLoginSubmit">
    <div class="mb-3">
    <input 
     v-model="email"
     placeholder="メールアドレス" 
     type="email" 
     class="form-control form-control-lg"
     />
    </div>
    <div class="mb-3">
    <input
      v-model="password"
      placeholder="パスワード"
      type="password" 
      class="form-control form-control-lg"
      />
  </div>

    <button type="submit" class="btn btn-primary w-100">ログイン</button>
   
    <p v-if="message" class="mt-3 text-danger text-center">{{ message }} </p>
  </form>
</div>
</div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email= ref('')
const password= ref('')
const message=ref('')
const userStore=useUserStore()
const router=useRouter()

const handleLoginSubmit = () => {
  if (!email.value.trim() || !password.value.trim()) {
    alert('メールアドレスとパスワードを入力してください')
    return
  }
  handleLogin()
}

const handleLogin=async () => {
  try{
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
      user: {
        email: email.value,
        password: password.value
      }
    })

   userStore.setToken(res.data.token)
   message.value = ''  
    router.push('/')
  }catch(error){
    message.value = error.response?.data?.status?.message || 'ログインに失敗しました'
  }
}

</script>