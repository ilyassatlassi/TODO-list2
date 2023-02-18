const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.getElementById('add');
const list = document.getElementById('listTodo');
let currendID = 0;
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
  this.arrayOfTitle = this.arrayOfTitle.filter((task) => task.id != taskId);
}

showList = (title, author) =>{
  let itemId = currendID;
  list.innerHTML = '';
  this.arrayOfTitle.forEach((task) => {
    const li = document.createElement('li');
    const titleBook = document.createElement('p');
    titleBook.textContent = `"${title}" by ${author}`;
    li.className = 'task';
    li.setAttribute('data-id', itemId);
    li.appendChild(titleBook);
    const span = document.createElement('button');
    span.className = 'del';
    span.appendChild(document.createTextNode('Remove'));
    li.appendChild(span);
    list.appendChild(li);
  });
}

}

// if (localStorage.tasks) {
//   arrayOfTitle = JSON.parse(localStorage.getItem('tasks'));
// }
// call the data from the local storage

const listBook = new ListBooks();

// Add function
add.onclick = () => {
  if (title.value !== '') {
    /* eslint-disable */
    
    listBook.addTask(title.value, author.value);

    // listBook.showList(title.value, author.value)

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
  }
});

// Add task to array
// function addTask(title, author) {
//   // task Data
//   const task = {
//     id: Date.now(),
//     title,
//     author,
//     completed: false,
//   };

//   arrayOfTitle.push(task);
//   // show the task on the page
//   /* eslint-disable */
//   showList(arrayOfTitle);
//   // Add to local storage
//   /* eslint-disable */
//   AddToLocal(arrayOfTitle);
// }

// function showList(arrayOfTitle) {
//   list.innerHTML = '';
//   arrayOfTitle.forEach((task) => {
    // const li = document.createElement('li');
    // const titleBook = document.createElement('p');
    // const authorBook = document.createElement('p');
    // titleBook.textContent = task.title;
    // authorBook.textContent = task.author;
    // li.className = 'task';
    // li.setAttribute('data-id', task.id);
    // li.appendChild(titleBook);
    // li.appendChild(authorBook);
    // const span = document.createElement('button');
    // span.className = 'del';
    // span.appendChild(document.createTextNode('Remove'));
    // li.appendChild(span);
    // list.appendChild(li);
//   });
// }

// function AddToLocal(arrayOfTitle) {
//   window.localStorage.setItem('tasks', JSON.stringify(arrayOfTitle));
// }
// /* eslint-disable */
// function getDataFromLocal() {
//   const data = Window.localStorage.getItem('tasks');
//   data.forEach((arrayOfTitle) => {
//     listBook.showList(arrayOfTitle.title, arrayOfTitle.author);
//   });
// }


// AddToLocal(listBook.arrayOfTitle);
// console.log(AddToLocal(listBook.arrayOfTitle))
// listBook.showList(title.value, author.value);
window.addEventListener('beforeunload', () => {
  localStorage.setItem('book', JSON.stringify(listBook.arrayOfTitle));
});

if (window.localStorage.getItem('book') !== 'undefined') {
  const data = JSON.parse(window.localStorage.getItem('book'));
  data.forEach((e) => {
    listBook.showList(e.title, e.author);
  });
console.log(data)
}