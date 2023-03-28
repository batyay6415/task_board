const form = document.querySelector("form");
const remove = document.querySelector("#btn");
let taskList = [];
const TASKS = "tasks";

form.addEventListener("submit", handleSubmit);
remove.addEventListener("click", handleRemove);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const task = getTaskData(form);
  task.id = Math.ceil(Math.random() * 10000000);
  addTaskToList(task);
  createNewTask();
  addTaskStorage();
}

function getTaskData(form) {
  const task = {};
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    task[key] = value;
  });
  return task;
}

function handleRemove() {
  form.reset();
}

function addTaskToList(task) {
  taskList.push(task);
}

function addTaskStorage() {
  const taskString = JSON.stringify(taskList);
  localStorage.setItem("tasks", taskString);
}

function createNewTask() {
  const taskContainer = document.querySelector("#taskContainer");
  taskContainer.innerHTML = "";
  taskList.forEach((task) => {
    const newNote = document.createElement("div");
    newNote.classList.add("fade-in-image", "fade-in-text", "col-3", "note");
    newNote.innerHTML = `
    <div>
    
    <i id = "removeBtn" class="bi bi-x-circle" onClick="RemoveTask(${task.id})"></i>
          <textarea class = "areaNote" >${task.name}</textarea>
          <div class = "date , mb-3">
          <p class="text2">${task.date}</p>
          <p class="text3">${task.hour}</p>
          </div>
      </div>
    `;
    taskContainer.appendChild(newNote);
  });
}

function RemoveTask(id) {
  taskList = taskList.filter((task) => task.id != id);
  createNewTask();
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
window.onload = () => {
  let localTasks = localStorage.getItem("tasks");
  if (localTasks) {
    taskList = JSON.parse(localTasks);
    createNewTask();
  }
};

