import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import Login from '@/views/Login.vue'
import GetUsers from '@/views/GetUsers.vue'

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
  {
    path: "/getusers",
    name: "getusers",
    component: GetUsers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;