function hideError() {
  console.log("hello!");
  document.getElementById("task-form-error").hidden = true;
}

export function createAddTaskForm(onSubmit, onCancel = () => null) {
  const formElem = document.createElement("form");
  formElem.classList.add("edit-task-form");

  formElem.innerHTML = `
   <p id="task-form-error" class="form-error" style="color: red" hidden></p>

    <label class="edit-form-label">
        Title: <input onfocus="(function(){ document.querySelector('#task-form-error').hidden = true })()" class="edit-form-item" type="text" name="title" />
    </label>

     <div>
        <label class="edit-form-label" for="task-description">Description:</label>
        <textarea style="resize: none;" class="edit-form-item" name="description" id="task-description" rows="10" cols="50"></textarea>
     </div>

    <label class="edit-form-label">
        Status: <input class="edit-form-item" type="text" name="status" />
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
