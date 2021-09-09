import { createWebHistory, createRouter } from "vue-router";
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import HelloWorld from '@/components/HelloWorld.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeNotLogged,
  },
  {
    path: "/about",
    name: "About",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;