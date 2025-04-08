<template>
  <div class="container my-5" style="max-width: 400px;">
    <h2 class="mb-4">新規登録</h2>

    <form @submit.prevent="handleSignup">
      <div class="mb-3">
      <input
       v-model="email"
        type="email" 
        placeholder="メールアドレス"
        class="form-control"
         />
      </div>

      <div class="mb-3">
      <input
       v-model="password"
        type="password"
        placeholder="パスワード" 
        class="form-control"
         />
      </div>

      <div class="mb-3">
      <input 
        v-model="passwordConfirmation"
        type="password"
        placeholder="パスワード確認" 
        class="form-control"
          />
      </div>

      <button type="submit" class="btn btn-success w-100">登録</button>
    <div v-if="message" class="alert alert-danger mt-3" role="alert">
      {{ message }}
    </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const message = ref('')

const handleSignup = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/v1/users', {
      user: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    })
    message.value = res.data.status?.message || '登録が完了しました！'
    router.push('/login')
  } catch (error) {
    if (error.response?.data?.errors) {
      message.value = error.response.data.errors.join(',')
    } else {
      message.value = 'エラーが発生しました'
    }
  }
}
</script>