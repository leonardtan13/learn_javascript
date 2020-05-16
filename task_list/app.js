// Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get task from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Adding classname to the link
    link.className = "delete-item secondary-content";
    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Adding link to the li
    li.appendChild(link);

    // append li to UL
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Adding classname to the link
  link.className = "delete-item secondary-content";
  // Add Icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Adding link to the li
  li.appendChild(link);

  // append li to UL
  taskList.appendChild(li);

  // Store in Local Storage
  storeTask(taskInput.value);

  // clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store task

function storeTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // adding into the array
  tasks.push(task);

  // set item back
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  // U want to check whether the a tag contains the class delete-item
  if (e.target.parentElement.classList.contains("delete-item")) {
    // removing the whole li node
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); // removes that item by the index
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  // taskList.innerHTML = "";

  // Faster way of doing it, remove child, through while loop
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocal();
}

function clearTasksFromLocal() {
  localStorage.clear();
}

// Filter tasks

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
