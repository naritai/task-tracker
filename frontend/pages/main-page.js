import { TasksPage } from "./tasks-page.js";
import { UsersPage } from "./users-page.js";
import { Router } from "../core/index.js";

const container = document.querySelector("#app");

const routerConfig = {
  "/": () => new TasksPage({ container }).render(),
  "/users": () => new UsersPage({ container }).render(),
};

const router = new Router(routerConfig);
