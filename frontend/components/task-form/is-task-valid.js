export function isTaskValid(task = {}) {
  return !Object.values(task).some((item) => item.trim() === "");
}

// TODO:
// написать функцию validateTaskForm(task)
// возвращает массив ошибок
// если ошибок нет -> []
// либо объект с полями, в которых ошибка - пример:
// [{ title: 'Значение не может быть пустым.'}, {description: 'Значение не может быть пустым.'}  ]
