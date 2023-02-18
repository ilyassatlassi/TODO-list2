/* eslint-disable max-classes-per-file */
const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.getElementById('add');
const list = document.getElementById('listTodo');
let currendID = Date.now();
class Books {
  constructor(title, author = null, id) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class ListBooks {
  constructor() {
    this.arrayOfTitle = [];
  }

  // Add task to array
 addTask = (title, author) => {
   const book = new Books(title, author, currendID);
   this.arrayOfTitle.push(book);
 }

  deleteFromLocal = (taskId) => {
    /* eslint-disable eqeqeq */
    this.arrayOfTitle = this.arrayOfTitle.filter((task) => task.id != taskId);
  }

showList = (pa) => {
  list.innerHTML = '';
  pa.forEach((task) => {
    const li = document.createElement('li');
    const titleBook = document.createElement('p');
    titleBook.textContent = `"${task.title}" by ${task.author}`;
    li.className = 'task';
    li.setAttribute('data-id', task.id);
    li.appendChild(titleBook);
    const span = document.createElement('button');
    span.className = 'del';
    span.appendChild(document.createTextNode('Remove'));
    li.appendChild(span);
    list.appendChild(li);
  });
}
}

// call the data from the local storage

const listBook = new ListBooks();
if (localStorage.tasks) {
  listBook.arrayOfTitle = JSON.parse(localStorage.getItem('tasks'));
}

function AddToLocal(arrayOfTitle) {
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTitle));
  });
}

// Add function
add.onclick = () => {
  if (title.value !== '') {
    /* eslint-disable */
    
    listBook.addTask(title.value, author.value);
    AddToLocal(listBook.arrayOfTitle)
    currendID +=1;
    listBook.showList(listBook.arrayOfTitle)
    title.value = '';
    author.value = '';
  }
};
console.log(listBook.addTask)
console.log(listBook.arrayOfTitle)

// remove function
list.addEventListener('click', (e) => {
  // delete button
  if (e.target.classList.contains('del')) {
    // remove element from page
    e.target.parentElement.remove();
    // remove from local storage
    /* eslint-disable */
    listBook.deleteFromLocal(e.target.parentElement.getAttribute('data-id'));
    AddToLocal(listBook.arrayOfTitle)
  }
});
listBook.showList(listBook.arrayOfTitle)