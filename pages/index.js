import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

export const taskCounterEl = document.querySelector(".counter__text");
export let taskCounterTotal = 0;
export let taskCounterUncomplete = 0;

export function incrementTotal() {
  taskCounterTotal++;
}

export function decrementTotal() {
  taskCounterTotal--;
}

export function incrementUncomplete() {
  taskCounterUncomplete++;
}

export function decrementUncomplete() {
  taskCounterUncomplete--;
}

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

const addTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
  taskCounterTotal++;
  taskCounterEl.textContent = `Showing ${taskCounterUncomplete} out of ${taskCounterTotal} completed`;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const todoData = { name, date, id };
  addTodo(todoData);
  newTodoValidator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  addTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
