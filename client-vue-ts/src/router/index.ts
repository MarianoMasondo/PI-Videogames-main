import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import CreateVideogameView from "../views/CreateVideogameView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/videogames/:id",
      name: "detail",
      component: DetailView,
    },
    {
      path: "/create",
      name: "create",
      component: CreateVideogameView,
    },
  ],
});

export default router;
