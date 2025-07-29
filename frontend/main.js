import { getTasks, removeTask, editTask } from "./api.js";
import { createEditTaskForm } from "./components/create-edit-form-task.js";

// открываем форму редактирования задачи
// пихаем в форму значения кнкретной задачи
// вешаем обработчики событий на элементы формы
// вешаем обработчик события на сохранение формы -> отправляем запрос PUT
// добавляем кнопку отмены

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
  removeButton.classList.add("task-remove-button");
  removeButton.textContent = "remove button";
  taskActions.append(removeButton);

  removeButton.addEventListener("click", () => {
    removeTask(id)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("task-edit-button");
  editButton.textContent = "edit button";
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
