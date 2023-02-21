import { DateTime } from './luxon.js';

const List = document.getElementById('List');
const AddNew = document.getElementById('AddNew');
const Contact = document.getElementById('Contact');
const dayDate = document.getElementById('dateTime');
const listBookSection = document.getElementById('box');
const addNewBook = document.getElementById('form');
const contactMe = document.getElementById('contact-section');

List.addEventListener('click', () => {
  listBookSection.classList.remove('hidden');
  addNewBook.classList.add('hidden');
  contactMe.classList.add('hidden');
});
AddNew.addEventListener('click', () => {
  listBookSection.classList.add('hidden');
  addNewBook.classList.remove('hidden');
  contactMe.classList.add('hidden');
});
Contact.addEventListener('click', () => {
  listBookSection.classList.add('hidden');
  addNewBook.classList.add('hidden');
  contactMe.classList.remove('hidden');
});
dayDate.innerHTML = `Date and Time: ${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`;
