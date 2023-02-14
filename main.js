const title = document.getElementById("title");
const author = document.getElementById("author");
const add = document.getElementById("add");
const form = document.getElementById("form");
const list = document.getElementById("listTodo");

// Empty array to add data
let arrayOfTitle = [];
// check if there is data in local storage

if (localStorage.tasks) {
  arrayOfTitle = JSON.parse(localStorage.getItem("tasks"));
}
// call the data from the local storage

// Add function
add.onclick = function () {
  if (title.value !== "") {
    addTask(title.value);
    title.value = "";
  };
}
//remove function
list.addEventListener("click", (e) => {
  //delete button
  if (e.target.className.contains("del")) {
    // remove element from page
    e.target.parentElement.remove();
    // remove from local storage
    deleteFromLocal(e.target.parentElement.getAttribute("data-id"));
  }
});

// Add task to array
function addTask(title) {
  //task Data
  const task = {
    id: Date.now(),
    title: title,
    completed: false,
  };

  arrayOfTitle.push(task);
  // show the task on the page
  showList(arrayOfTitle);
  // Add to local storage
  AddToLocal(arrayOfTitle);
}

function showList(arrayOfTitle) {
  list.innerHTML = "";
  arrayOfTitle.forEach((task) => {
    let li = document.createElement("li");
    li.className = "task";
    li.setAttribute("data-id", task.id);
    li.appendChild(document.createTextNode(task.title));
    let span = document.createElement("button");
    span.className = "del";
    span.appendChild(document.createTextNode("Remove"));
    li.appendChild(span);
    list.appendChild(li);
  });
}

function AddToLocal(arrayOfTitle) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTitle));
}

function getDataFromLocal() {
  let data = Window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    getDataFromLocal(tasks);
  }
}

showList(arrayOfTitle);
