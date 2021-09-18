import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from "@/views/HomeNotLogged.vue";
import Home from "@/views/home.vue";
import Profil from "@/views/Profil.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import GetUsers from "@/views/GetUsers.vue";
import store from "@/store/index";
import { computed } from "vue";

const routes = [
  {
    path: "/",
    name: "HomeNotLogged",
    component: HomeNotLogged,
    beforeEnter: (to, from, next) => {
      if (userIsLogged()) {
        router.push("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (userIsLogged()) {
        next();
      } else {
        router.push("/");
      }
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    beforeEnter: (to, from, next) => {
      if (userIsLogged()) {
        next();
      } else {
        router.push("/");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (userIsLogged()) {
        router.push("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (userIsLogged()) {
        router.push("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/getusers",
    name: "getusers",
    component: GetUsers,
  },
];

function userIsLogged() {
  if (store.state.user) {
    return true;
  } else {
    if (JSON.parse(localStorage.getItem("USER"))) {
      store.commit("SET_USER", JSON.parse(localStorage.getItem("USER")));
      return true;
    } else {
      return false;
    }
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
