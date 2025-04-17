<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'


const userStore=useUserStore()
const router=useRouter()

const handleLogout= () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
      <RouterLink 
      to="/" 
      class="navbar-brand"
      :class="$route.path === '/' ? 'text-light' : 'text-secondary'"
      >
      ホーム
    </RouterLink>

      
    <div class="d-flex gap-2">
      <RouterLink
       to="/signup"
       class="btn btn-outline-light btn-sm"
        v-if="!userStore.isLoggedIn"
        >
        新規登録
      </RouterLink>

      <RouterLink 
      to="/login"
       class="btn btn-outline-light btn-sm"
       v-if="!userStore.isLoggedIn"
       >
       ログイン
      </RouterLink>

      <button
       v-if="userStore.isLoggedIn"
        @click="handleLogout"
        class="btn btn-outline-warning btn-sm"
        >
        ログアウト
      </button>
      </div>
    </div>
</nav>

  <RouterView />
</div>
</template>

