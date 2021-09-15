import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import Home from '@/views/home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import GetUsers from '@/views/GetUsers.vue'
import store from '@/store/index'
import { computed } from 'vue'

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
    beforeEnter: (to, from, next) => {
      if (typeof store.state.user.token != 'string') {
        if (JSON.parse(localStorage.getItem("USER"))) {
          store.commit("SET_USER", JSON.parse(localStorage.getItem("USER")));
        } else {
          router.push("/");
        }
      }
      next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
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