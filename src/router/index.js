import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import Home from '@/views/home.vue'
import Login from '@/views/Login.vue'
import GetUsers from '@/views/GetUsers.vue'

const routes = [
  {
    path: "/",
    name: "HomeNotLogged",
    component: HomeNotLogged,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
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