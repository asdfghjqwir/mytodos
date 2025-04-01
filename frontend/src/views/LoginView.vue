<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" placeholder="メールアドレス" type="email" />
    <input v-model="password" placeholder="パスワード" type="password" />
    <button type="submit">ログイン</button>
    <p v-if="message">{{ message }}</p>
  </form>
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
    const res=await axios.post('http://localhost:3000/api/v1/sessions', {
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