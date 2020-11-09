import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/petshop",
    name: "Petshop",
    // route level code-splitting
    // this generates a separate chunk (petshop.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "petshop" */ "@/views/Petshop.vue")
  },
  {
    path: "/ecommerce",
    // route level code-splitting
    // this generates a separate chunk (ecommerce.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ecommerce" */ "@/views/Ecommerce.vue"),
    children: [
      {
        path: "",
        name: "ListaProdutos",
        component: () => import("@/views/produtos/ListaProdutos.vue")
      },
      {
        path: ":id",
        name: "DetalheProduto",
        component: () => import("@/views/produtos/DetalheProduto.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
