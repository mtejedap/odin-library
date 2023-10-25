const myLibrary = [];
let bookIndex = 0;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.index = bookIndex;
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    bookIndex++;
}

function displayBooks() {
    const content = document.querySelector(".content");
    const oldDivs = document.querySelectorAll(".book");
    oldDivs.forEach(book => {
        content.removeChild(book);
    });
    myLibrary.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book");
        if (book.isRead == true) {
            div.textContent = book.title + " by " + book.author + 
                              ", " + book.pages + " pages, already read";
        } else {
            div.textContent = book.title + " by " + book.author + 
                          ", " + book.pages + " pages, not read yet";
        }
        const button = document.createElement("button");
        button.textContent = "Remove Book";
        button.addEventListener("click", (e) => {
            myLibrary.splice(book.index, 1);
            bookIndex = 0;
            myLibrary.forEach(book => {
                book.index = bookIndex
                bookIndex++;
            });
            displayBooks();
        });
        div.appendChild(button);
        content.appendChild(div);
    });
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    addBookToLibrary(form.elements.title.value, form.elements.author.value, 
                     form.elements.pages.value, form.elements.isRead.value == "true");
    displayBooks();
});