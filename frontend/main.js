import { getTasks, removeTask, editTask, addTask } from "./api.js";
import { createEditTaskForm, createAddTaskForm } from "./components/index.js";

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
  taskDescription.textContent = description;
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
    const handleSubmitEditTask = (event) => {
      const formData = new FormData(event.target);
      formData.append("id", id);
      const updatedTask = Object.fromEntries(formData.entries());
      editTask(updatedTask)
        .then(() => {
          event.target.remove();
          getTasks().then(renderTasks);
        })
        .catch(console.log);
    };

    const editFormElem = createEditTaskForm(task, handleSubmitEditTask);
    document.body.append(editFormElem);

    // TODO:
    // при открытии формы -> фокус на первом поле
    // добавить валидацию на пустые поля (title)
    // открывать возможность отправить запрос на сервер только если данные менялись (дизейл кнопки сохранить)
    // добавить компонент модального окна с overlay ....
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
  const handleSubmitAddTask = (event) => {
    const formData = new FormData(event.target);
    const newTask = Object.fromEntries(formData.entries());

    const isValid = isTaskValid(newTask);

    if (!isValid) {
      const errElem = event.target.querySelector(".form-error");
      errElem.innerHTML = "";
      errElem.textContent = "Форма невалидна, заполните все поля и повторите.";
      errElem.hidden = false;

      return;
    } else {
      addTask(newTask)
        .then(() => {
          event.target.remove();
          getTasks().then(renderTasks);
        })
        .catch(console.log);
    }
  };

  const addFormElem = createAddTaskForm(handleSubmitAddTask);
  document.body.append(addFormElem);
});

function isTaskValid(task) {
  return !Object.values(task).some((item) => item === "");
}
