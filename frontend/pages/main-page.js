import { TasksPage } from "./tasks-page.js";
const container = document.querySelector("#app");
const tasksPage = new TasksPage({ container });
tasksPage.render();
