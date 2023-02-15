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

// Add task to array
function addTask(title, author) {
  // task Data
  const task = {
    id: Date.now(),
    title: title,
    author: author,
    completed: false,
  };

// Add function
add.onclick = () => {
  if (title.value !== '') {
    addTask(title.value, author.value);
    title.value = '';
    author.value = '';
  }
};

function deleteFromLocal(taskId) {
  arrayOfTitle = arrayOfTitle.filter((task) => task.id !== taskId);
  AddToLocal(arrayOfTitle);
}
// remove function
list.addEventListener('click', (e) => {
  // delete button
  if (e.target.classList.contains('del')) {
    // remove element from page
    e.target.parentElement.remove();
    // remove from local storage
    deleteFromLocal(e.target.parentElement.getAttribute('data-id'));
  }
});



  arrayOfTitle.push(task);
  // show the task on the page
  showList(arrayOfTitle);
  // Add to local storage
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

// function getDataFromLocal() {
//   const data = Window.localStorage.getItem('tasks');
//   if (data) {
//     const tasks = JSON.parse(data);
//     getDataFromLocal(tasks);
//   }
// }
showList(arrayOfTitle);
