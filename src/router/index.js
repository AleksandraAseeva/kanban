import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/addtask",
    name: "addtask",
    component: () =>
      import("../views/TaskForm.vue"),
  },
  {
    path: "/edittask",
    name: "edittask",
    component: () =>
      import( "../components/UpdateTask.vue"),
  },
  {
    path: "/kanbantasks",
    name: "kanbantasks",
    component: () =>
      import("../views/KanbanTasks.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import("../views/Settings.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

