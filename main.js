const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.getElementById('add');
const list = document.getElementById('listTodo');

// Empty array to add data
let arrayOfTitle = [];
// check if there is data in local storage

if (localStorage.tasks) {
  arrayOfTitle = JSON.parse(localStorage.getItem('tasks'));
}
// call the data from the local storage

// Add function
add.onclick = () => {
  if (title.value !== '') {
    /* eslint-disable */
    addTask(title.value, author.value);
    title.value = '';
    author.value = '';
  }
};
// remove function
list.addEventListener('click', (e) => {
  // delete button
  if (e.target.classList.contains('del')) {
    // remove element from page
    e.target.parentElement.remove();
    // remove from local storage
    /* eslint-disable */
    deleteFromLocal(e.target.parentElement.getAttribute('data-id'));
  }
});

// Add task to array
function addTask(title, author) {
  // task Data
  const task = {
    id: Date.now(),
    title,
    author,
    completed: false,
  };

  arrayOfTitle.push(task);
  // show the task on the page
  /* eslint-disable */
  showList(arrayOfTitle);
  // Add to local storage
  /* eslint-disable */
  AddToLocal(arrayOfTitle);
}

function showList(arrayOfTitle) {
  list.innerHTML = '';
  arrayOfTitle.forEach((task) => {
    const li = document.createElement('li');
    const titleBook = document.createElement('p');
    const authorBook = document.createElement('p');
    titleBook.textContent = task.title;
    authorBook.textContent = task.author;
    li.className = 'task';
    li.setAttribute('data-id', task.id);
    li.appendChild(titleBook);
    li.appendChild(authorBook);
    const span = document.createElement('button');
    span.className = 'del';
    span.appendChild(document.createTextNode('Remove'));
    li.appendChild(span);
    list.appendChild(li);
  });
}

function AddToLocal(arrayOfTitle) {
  window.localStorage.setItem('tasks', JSON.stringify(arrayOfTitle));
}
/* eslint-disable */
function getDataFromLocal() {
  const data = Window.localStorage.getItem('tasks');
  if (data) {
    const tasks = JSON.parse(data);
    getDataFromLocal(tasks);
  }
}

function deleteFromLocal(taskId) {
  arrayOfTitle = arrayOfTitle.filter((task) => task.id !== taskId);
  AddToLocal(arrayOfTitle);
}

showList(arrayOfTitle);
