<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/signup">新規登録</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

