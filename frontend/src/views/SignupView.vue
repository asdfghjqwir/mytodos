<template>
     <div class="container-fluid px-3 d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="bg-light p-5 shadow rounded w-100" style="max-width: 720px;">
    <h2 class="mb-4 text-start">新規登録</h2>

    <form @submit.prevent="handleSignupSubmit">
      <div class="mb-3">
      <input
       v-model="email"
        type="email" 
        placeholder="メールアドレス"
        class="form-control form-control-lg"
         />
      </div>

      <div class="mb-3">
      <input
       v-model="password"
        type="password"
        placeholder="パスワード" 
        class="form-control form-control-lg"
         />
      </div>

      <div class="mb-3">
      <input 
        v-model="passwordConfirmation"
        type="password"
        placeholder="パスワード確認" 
        class="form-control form-control-lg"
          />
      </div>

      <button type="submit" class="btn btn-success btn-lg w-100">登録</button>
    <p v-if="message" class="mt-3 text-danger text-center">{{ message }} </p>
    </form>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const message = ref('')
const userStore = useUserStore()

const handleSignupSubmit = () => {
  if (!email.value.trim() || !password.value.trim() || !passwordConfirmation.value.trim()) {
    alert('すべての項目を入力してください')
    return
  }

  if (password.value !== passwordConfirmation.value) {
    alert('パスワードと確認用パスワードが一致しません')
    return
  }

  handleSignup()
}

const handleSignup = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signup`, {
      user: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    })

    userStore.setToken(res.data.token)
    message.value = ''
    router.push('/')
  } catch (error) {
    if (error.response?.data?.errors) {
      message.value = error.response.data.errors.join(', ')
    } else {
      message.value = '登録に失敗しました'
    }
  }
}
</script>