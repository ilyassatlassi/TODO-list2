import Books from './booksClass.js';

let currendID = Date.now();

const list = document.getElementById('box');
class ListBooks {
    constructor() {
      this.arrayOfTitle = [];
    }
  
    // Add task to array
   addTask = (title, author) => {
     const book = new Books(title, author, currendID);
     this.arrayOfTitle.push(book);
     currendID += 1;
   }
  
    deleteFromLocal = (taskId) => {
      this.arrayOfTitle = this.arrayOfTitle.filter((task) => task.id /* eslint-disable */!= taskId);
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

export {
  currendID,
  ListBooks
}