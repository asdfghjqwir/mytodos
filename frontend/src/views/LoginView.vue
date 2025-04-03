<template>
  <div class="container my-5" style="max-width: 400px;">
  <h2 class="mb-4">ログイン</h2>

  <form @submit.prevent="handleLogin">
    <div class="mb-3">
    <input 
     v-model="email"
     placeholder="メールアドレス" 
     type="email" 
     class="form-control"
     />
    </div>
    <div class="mb-3">
    <input
      v-model="password"
      placeholder="パスワード"
      type="password" 
      class="form-control"
      />
  </div>

    <button type="submit" class="btn btn-primary w-100">ログイン</button>
   
    <div v-if="message" class="alert alert-danger mt-3" role="alert">
      {{ message }}
    </div>
  </form>
</div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email= ref('')
const password= ref('')
const message=ref ('')
const userStore=useUserStore()
const router=useRouter()


const handleLogin=async () => {
 
  try{
    const res=await axios.post('http://localhost:3000/api/v1/login', {
      user: {
        email: email.value,
        password: password.value
      }
    })

   userStore.setToken(res.data.token)
    message.value='ログイン成功!'
    router.push('/')
  }catch(error){
    message.value=error.response?.data?.errors?.join(',') || 'ログインに失敗しました'
  }
}

</script>