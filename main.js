/* eslint max-classes-per-file: ["error", 8] */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Empty array to add data
class methods {
  static getbooks() {
    let arrayOfbook = [];
    // check if there is data in local storage

    if (localStorage.getItem('arrayOfbook')) {
      arrayOfbook = JSON.parse(localStorage.getItem('arrayOfbook'));
    } else {
      arrayOfbook = [];
    }
    return arrayOfbook;
  }

  // Add function
  static addBook(book) {
    const newBook = methods.getBooks();
    newBook.push(book);
    localStorage.setItem('newBook', JSON.stringify(newBook));
  }

  // remove function
  static removeBook(author) {
    const books = methods.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = methods.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.book');

    const row = document.createElement('tr');

    row.innerHTML = `
        <div class="book-details">
        
        <p>"${book.title}"</p>
        <p>by</p>
        <p>${book.author}</p>
       
       
        <button><a href="#" class="button">remove</a></button>
        
        </div>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('button')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}

// event display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();
  // get form values
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;

  // validate

  // instatiate book
  const book = new Book(title, author);

  // add to ui

  UI.addBookToList(book);

  // add book to methods
  methods.addBook(book);

  // clear fields.
  UI.clearFields();
});

// event: Remove a Book
document.querySelector('.book').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  // Remove book from methods
  methods.removeBook(e.target.parentElement.previousElementSibling.textContent);
});