/* 
================================================================================================================================
Book Constructor
================================================================================================================================
*/
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


/* 
================================================================================================================================
UI Class
================================================================================================================================
*/
class UI {
    static displayBooks() {
        // const storedBooks =[
        //     {
        //         title: 'Rich Dad Poor Dad',
        //         author: 'Robert Kiyosaki',
        //         isbn: '483284'
        //     },
        //     {
        //         title: 'The Intelligent Investor',
        //         author: 'Benjamin Graham',
        //         isbn: '843842'
        //     }
        // ];

        // const books = storedBooks;
        const books = Store.getBook();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const tableBody = document.querySelector('.table-body');
        const tr = document.createElement('tr');
            tr.className = 'table-body-row';
            tr.innerHTML = `
                <td class="table-detail">${book.title}</td>
                <td class="table-detail">${book.author}</td>
                <td class="table-detail">${book.isbn}</td>
                <td class="table-detail remove"><a href="#" class="delete">x</a></td>
                `
        tableBody.appendChild(tr);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static alerts (message, alert) {
        const span = document.querySelector('.span');
        const bookForm = document.querySelector('.book-form');
        const div = document.createElement('div');
        div.className = 'alert-div';
        div.innerHTML = `<p class='top alert alert-${alert}'>${message}</p>`;
        span.insertBefore(div, bookForm);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}



/* 
================================================================================================================================
Event: Display Book
================================================================================================================================
*/
class Store {
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBook();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}



/* 
================================================================================================================================
Event: Display Book
================================================================================================================================
*/
document.addEventListener('DOMContentLoaded', UI.displayBooks);


/* 
================================================================================================================================
Event: Add Book
================================================================================================================================
*/
const form = document.querySelector('.form-2');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.alerts('Please fill in all the fields', 'error');
    }
    else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        UI.alerts('Book Added', 'success');
        UI.clearFields();
    }
})

/* 
================================================================================================================================
Event: Delete Book
================================================================================================================================
*/
const removeBook = document.querySelector('.table-body');
removeBook.addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.alerts('Book deleted', 'success');
})




