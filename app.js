// Book Class : Represents Book Everytime we Create a Book
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author= author;
        this.isbn = isbn;
    }
}
// UI class: Handles the UI Tasks

class UI {
    static displayBooks() {
   
        const books = Store.getBooks();

        books.forEach((book) =>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');


        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class= "btn btn-danger btn-sm delete">Remove</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // Make it disappear in 1 second
        setTimeout(()=> document.querySelector('.alert').remove(),5000);

    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}
// Store Class: Local Storage in browser
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));


    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

// EVents to display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event to add a Book

document.querySelector('#book-form').addEventListener('submit',(e) => {
    // Prevent default event of submit button
    e.preventDefault();
    // Get form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validations check if not empty etc
    if(title === ''  || author === ''  || isbn === ''){
        UI.showAlert('Please fill in all the fields','info');
    }else {


        //Instantaing  the Book from Book Class
    const book = new Book(title, author,isbn);
    console.log(book);

    // Add the Book to UI booklist
    UI.addBookToList(book);
// Add Book to Local Store

Store.addBook(book);
    // show success , message
    UI.showAlert('Succesfully Book added ','success');

    // Clear the input fields
    UI.clearFields();
    
    }



});
// Events to remove a book
document.querySelector('#book-list').addEventListener('click',(e)=> {
   // Removing the Book from UI
    UI.deleteBook(e.target);
// Remove Book from the Store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);



    // show deletedBook , message
    UI.showAlert('Succesfully Book Removed ','danger');

});