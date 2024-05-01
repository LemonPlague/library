// --------TODO--------
// 1. remove the "book type" options and instead use
// javascript to parse the input of 'length' and
// mark the entry as either audio or paper based on the 
// type of units that were used.
// 2. come up with pseudo code to color code cards based
// on above information
// 3. come up with pseudo code to color code cards based
// on the read-status of the book



// --------INITIAL VARIABLES--------
const addNewBookButton = document.querySelector('.add-that-book');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#book-dialog');

// Array to hold multiple cards
const myLibrary = [];

// Book constructor
function Book(title, author, length, readStatus) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.readStatus = readStatus;
}

// open the dialog when the button is clicked
addNewBookButton.addEventListener('click', () => {
    dialog.showModal();
})




function addBookToLibrary() {


    
    // 3. add the new object to the myLibrary[] array.
    
    // 4. create a div with class '.card' to display the data prompt user for information
    
}