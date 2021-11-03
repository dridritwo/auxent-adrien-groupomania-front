import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from "@/views/HomeNotLogged.vue";
import Home from "@/views/Home.vue";
import HottestPosts from "@/views/HottestPosts.vue";
import NewPost from "@/views/NewPost.vue";
import UpdatePost from "@/views/UpdatePost.vue";
import Profil from "@/views/Profil.vue";
import ProfilEdit from "@/views/ProfilEdit.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import store from "@/store/index";
import { getUser } from "../services/UserService";

const routes = [
  {
    path: "/",
    name: "HomeNotLogged",
    component: HomeNotLogged,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        router.push("/home");
        return next();
      } else {
        return next();
      }
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
  {
    path: "/hottest",
    name: "Hottest",
    component: HottestPosts,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
  {
    path: "/profil-edit",
    name: "ProfilEdit",
    component: ProfilEdit,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        router.push("/home");
        return next();
      } else {
        return next();
      }
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        router.push("/home");
        return next();
      } else {
        return next();
      }
    },
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: NewPost,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
  {
    path: "/update-post",
    name: "UpdatePost",
    component: UpdatePost,
    beforeEnter: async (to, from, next) => {
      if (await userIsLogged()) {
        return next();
      } else {
        router.push("/");
        return next();
      }
    },
  },
];

async function userIsLogged() {
  let localUser = JSON.parse(localStorage.getItem("USER"));
  if (store.state.user) {
    let response = await getUser(store.state.user.token);
    if (response.status == 200) {
      return true;
    } else {
      store.state.user = null;
      return false;
    }
  } else if (localUser) {
    let response = await getUser(localUser.token);
    if (response.status == 200) {
      let user = response.data;
      user.token = localUser.token;
      store.commit("SET_USER", user);
      return true;
    } else {
      localStorage.removeItem("USER");
      return false;
    }
  } else {
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
