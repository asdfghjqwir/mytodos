<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'


const userStore=useUserStore()
const router=useRouter()

const handleLoggout= () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink to="/signup" v-if="!userStore.isLoggedIn">新規登録</RouterLink>
      <RouterLink to="/login" v-if="!userStore.isLoggedIn">ログイン</RouterLink>
      <button v-if="userStore.isLoggedIn" @click="handleLoggout">ログアウト</button>
    </nav>

  <RouterView />
</div>
</template>

