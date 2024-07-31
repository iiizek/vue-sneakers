import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createRouter, createWebHistory } from "vue-router";

import "./style.css";
import App from "./App.vue";

import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const app = createApp(App);
const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/favorites", name: "favorites", component: Favorites },
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

app.use(autoAnimatePlugin);
app.use(router);

app.mount("#app");
