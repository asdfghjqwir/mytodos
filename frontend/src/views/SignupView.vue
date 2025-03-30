<template>
  <div>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="メールアドレス" />
      <input v-model="password" type="password" placeholder="パスワード" />
      <input v-model="passwordConfirmation" type="password" placeholder="パスワード確認" />
      <button type="submit">登録</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

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
    message.value = res.data.message
  } catch (error) {
    if (error.response?.data?.errors) {
      message.value = error.response.data.errors.join(',')
    } else {
      message.value = 'エラーが発生しました'
    }
  }
}
</script>