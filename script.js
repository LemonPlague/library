// --------INITIAL VARIABLES--------
const addNewBookButton = document.querySelector('.add-that-book');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#book-dialog');

// Array to hold multiple cards
const myLibrary = [];


function Book(title, author, length, bookType, readStatus) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.bookType = bookType;
    this.readStatus = readStatus;
}


addNewBookButton.addEventListener('click', () => {
    dialog.showModal();
})

// handle dialogue
function displayDialog() {
    // 1. prompt user (popup dialogue) for information when "add book" button is pushed
    //Popup the dialog window when the button is pushed.
    
    // 2a. if anywhere outside the dialog window is clicked, close dialogue and clear info



// 2b. if submit is pressed, store info as object using the book constructor
}




function addBookToLibrary() {


    
    // 3. add the new object to the myLibrary[] array.
    
    // 4. create a div with class '.card' to display the data prompt user for information
    
}