// varaibles UI
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load All Event Listeners.
loadEventListeners();

// function to load all event listenrs
function loadEventListeners() {
  // show task as soon as page loade
  document.addEventListener("DOMContentLoaded", getTasks);
  // form function take submit as event listener and call addtask function
  form.addEventListener("submit", addTask);
  // REMOVE Task Items. // event delegation body->div->a (top -> bottom)
  taskList.addEventListener("click", removeTask);
  // clear all tasks
  clearBtn.addEventListener("click", clearTask);
  // filter task
  filter.addEventListener("keyup", filterTasks);
}

// show task to ul from ls
// get task from ls
function getTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // get task from input value.
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    let li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    //  create delete link
    let link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class ='fas fa-remove'></i>";
    li.appendChild(link);
    // append li  to ul
    taskList.appendChild(li);
  });
}

// add task function

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task!");
  }
  // create li element
  let li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  //  create delete link
  let link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class ='fas fa-remove'></i>";
  li.appendChild(link);
  // append li  to ul
  taskList.appendChild(li);

  // store in locals storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// add task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // get task from input value.
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  // push these tasks in localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove a single  Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log("delete this items using event delegation!", e.target.parentElement.parentElement);
    if (confirm("Are You Sure!")) {
      e.target.parentElement.parentElement.remove();
      RemoveTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function RemoveTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // get task from input value.
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (item, index) {
    if (taskItem.textContent === item) {
      tasks.splice(index, 1);
    }
  });
  // set local storage after delting that item
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear  All Tasks
function clearTask() {
  // 1st way
  //   taskList.innerHTML = "";

  // faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear all task form ls
  ClearAllTaskFromLocalStorage();
}

function ClearAllTaskFromLocalStorage() {
  localStorage.clear();
}

// filetr tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
