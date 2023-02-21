import { ListBooks } from './modules/ListBooks.js';

const title = document.getElementById('title');
const author = document.getElementById('author');
const add = document.getElementById('buttonAdd');
const list = document.getElementById('box');

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
    listBook.addTask(title.value, author.value);
    AddToLocal(listBook.arrayOfTitle);
    listBook.showList(listBook.arrayOfTitle);
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
    listBook.deleteFromLocal(e.target.parentElement.getAttribute('data-id'));
    AddToLocal(listBook.arrayOfTitle);
  }
});
listBook.showList(listBook.arrayOfTitle);