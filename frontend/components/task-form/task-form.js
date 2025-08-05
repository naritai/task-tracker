import { isTaskValid } from "./is-task-valid.js";

export function taskForm(task, onSubmit, onCancel = () => null) {
  const { title, description, status, id } = task ?? {};

  const formElem = document.createElement("form");
  formElem.classList.add("task-form");

  formElem.innerHTML = `
    <label class="task-form-label">
        Title: <input class="task-form-item" type="text" name="title" value="${
          title ?? ""
        }" />
    </label>

     <div>
        <label class="task-form-label" for="task-description">Description:</label>
        <textarea style="resize: none;" class="task-form-item" name="description" id="task-description" rows="10" cols="50">
            ${description ?? ""}
        </textarea>
     </div>

    <label class="task-form-label">
        Status: <input class="task-form-item" type="text" name="status" value="${
          status ?? ""
        }" />
    </label>

    ${id ? "<input hidden type='text' name='id' value='${id}' />" : ""}

    <div class="task-form-actions">
        <button class="submit-task-form-btn" type="submit">Сохранить</button>
        <button class="cancel-task-form-btn" type="button">Отмена</button>
    </div>
  `;

  formElem.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const taskObject = Object.fromEntries(formData.entries());

    const isValid = isTaskValid(taskObject);
    if (isValid) {
      onSubmit(taskObject); // убедиться что сервер ответил УСПЕХОМ и только потом удалять форму
      event.target.remove();
    } else {
      formElem.classList.add("task-form--error");
    }
  });

  const cancelButton = formElem.querySelector(".cancel-task-form-btn");
  cancelButton.addEventListener("click", (event) => {
    onCancel(event);
    formElem.remove();
  });

  return formElem;
}
