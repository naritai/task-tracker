import { getTasks, removeTask, editTask, addTask } from "../api/tasks.js";
import { taskForm } from "../components/index.js";

const appContainer = document.querySelector("#app");

appContainer.innerHTML = `
    <h1 id="main_title">Task Tracker</h1>
  <button class="button task-add-button">Add Task</button>
  <div class="tasks"></div>
`;

// начальный рендер
getTasks().then(renderTasks);

function makeTaskItem(task) {
  const { title, description, status, id } = task;

  const taskElement = document.createElement("li");
  taskElement.classList.add("task-item");

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = title;
  taskElement.append(taskTitle);

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task-description");
  taskDescription.innerHTML = description;
  taskElement.append(taskDescription);

  const taskStatus = document.createElement("h5");
  taskStatus.classList.add("task-status");
  taskStatus.textContent = status;
  taskElement.append(taskStatus);

  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");

  const removeButton = document.createElement("button");
  removeButton.classList.add("button", "task-remove-button");
  removeButton.textContent = "remove task";
  taskActions.append(removeButton);

  removeButton.addEventListener("click", () => {
    removeTask(id)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("button", "task-edit-button");
  editButton.textContent = "edit task";
  taskActions.append(editButton);

  editButton.addEventListener("click", () => {
    const handleSubmitEditTask = (updatedTask) => {
      editTask(updatedTask)
        .then(() => getTasks().then(renderTasks))
        .catch(console.log);
    };
    const editFormElem = taskForm(task, handleSubmitEditTask);
    document.body.append(editFormElem);
  });

  taskElement.append(taskActions);
  return taskElement;
}

function renderTasks(tasks) {
  const tasksContainer = document.querySelector(".tasks");

  // очищаем элемент
  tasksContainer.innerHTML = "";

  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  tasks.forEach((task) => {
    const nextTaskElement = makeTaskItem(task);
    taskList.append(nextTaskElement);
  });

  tasksContainer.append(taskList);
}

const addNewTaskButton = document.querySelector(".task-add-button");

addNewTaskButton.addEventListener("click", () => {
  const handleSubmitAddTask = (newTask) => {
    addTask(newTask)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  };

  const addFormElem = taskForm(null, handleSubmitAddTask);
  document.body.append(addFormElem);
});
