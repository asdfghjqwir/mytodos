<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink to="/signup">新規登録</RouterLink>
      <RouterLink to="/login">ログイン</RouterLink>
    </nav>

  <RouterView />
</div>
</template>

