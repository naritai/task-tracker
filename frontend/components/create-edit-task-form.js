export function createEditTaskForm(task, onSubmit, onCancel = () => null) {
  const { title, description, status } = task;

  const formElem = document.createElement("form");
  formElem.classList.add("edit-task-form");

  formElem.innerHTML = `
    <label class="edit-form-label">
        Title: <input autofocus class="edit-form-item" type="text" name="title" value="${title}" />
    </label>

     <div>
        <label class="edit-form-label" for="task-description">Description:</label>
        <textarea style="resize: none;" class="edit-form-item" name="description" id="task-description" rows="10" cols="50">
            ${description}
        </textarea>
     </div>

    <label class="edit-form-label">
        Status: <input class="edit-form-item" type="text" name="status" value="${status}" />
    </label>

    <div class="edit-task-form-actions">
        <button class="submit-edit-form-btn" type="submit">Сохранить</button>
        <button class="cancel-edit-form-btn" type="button">Отмена</button>
    </div>
  `;

  formElem.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(event);
  });

  const cancelButton = formElem.querySelector(".cancel-edit-form-btn");
  cancelButton.addEventListener("click", (event) => {
    onCancel(event);
    formElem.remove();
  });

  return formElem;
}
