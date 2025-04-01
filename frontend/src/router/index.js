import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '@/stores/user'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    }
  ],
})

  router.beforeEach((to, from, next)=> {
    const userStore=useUserStore()

    if(to.meta.requiresAuth && !userStore.isLoggedIn) {
      next('/login')
    }else{
      next()
    }
  })

export default router
