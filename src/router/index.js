import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeNotLogged,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;